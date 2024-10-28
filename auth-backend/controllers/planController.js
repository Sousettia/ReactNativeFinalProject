const Plan = require("../models/plans"); // Import Plan model
const UserPlan = require("../models/userPlan"); // Import UserPlan model

// Create Plan
const createPlan = async (req, res) => {
  try {
    const { planName, budget, dateOnTrip, description, planId, creator } =
      req.body;

    if (!planName || !budget || !dateOnTrip) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPlan = await Plan.findOne({ planId });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan ID already exists" });
    }

    const newPlan = new Plan({
      planName,
      budget,
      dateOnTrip,
      description,
      planId,
      creator,
    });
    await newPlan.save();

    await UserPlan.findOneAndUpdate(
      { userId: creator },
      { $push: { plans: newPlan._id } }, // Store plan's ObjectId
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "Plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
};

// Get all plans for a specific user
const getUserPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPlans = await UserPlan.findOne({ userId }).populate("plans");

    if (!userPlans) {
      return res.status(404).json({ message: "User plans not found" });
    }

    res.status(200).json({
      message: "Plans retrieved successfully",
      plans: userPlans.plans, // This will now include full plan details
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
};

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving plans", error });
  }
};

// Get specific plan by ID
const getPlanById = async (req, res) => {
  const { planId } = req.params;
  try {
    const plan = await Plan.findOne({ planId });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the plan", error });
  }
};

// Update Plan
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedPlan = await Plan.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan updated successfully", plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: "Error updating plan", error });
  }
};

// Delete Plan
const deletePlan = async (req, res) => {
  try {
    const { userId, planId } = req.params;

    // Delete the plan from the `Plan` collection by `planId`
    const deletedPlan = await Plan.findOneAndDelete({ planId });

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Remove the `planId` from the `plans` array in the `UserPlan` collection
    await UserPlan.findOneAndUpdate({ userId }, { $pull: { plans: planId } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error });
  }
};
// Add an existing plan to a user by planId
const addPlanToUser = async (req, res) => {
  try {
    const { userId, planId } = req.params;

    // Find the plan by planId
    const plan = await Plan.findOne({ planId });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Update UserPlan to add the plan's ObjectId to the user's plans array
    const userPlan = await UserPlan.findOneAndUpdate(
      { userId },
      { $addToSet: { plans: plan._id } }, // Use plan._id to store reference to the entire plan
      { upsert: true, new: true }
    ).populate("plans"); // Populate plans to return the full details

    res.status(200).json({
      message: "Plan added to user successfully",
      userPlan, // This will now include full plan details due to populate
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding plan to user", error });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  getUserPlans,
  deletePlan,
  addPlanToUser,
};
