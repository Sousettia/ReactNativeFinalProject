const Plan = require("../models/plans"); // Import Plan model
const UserPlan = require('../models/userPlan'); // Add this at the top of your file
// Create Plan
const createPlan = async (req, res) => {
  try {
    const { planName, budget, dateOnTrip, description, planId, creator } =
      req.body;

    // Check all required fields
    if (!planName || !budget || !dateOnTrip || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if planId already exists in DB
    const existingPlan = await Plan.findOne({ planId });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan ID already exists" });
    }

    // Create new plan
    const newPlan = new Plan({
      planName,
      budget,
      dateOnTrip,
      description,
      planId,
      creator, // This should be the profile._id from the frontend
    });

    await newPlan.save();

    // Create the user-plan relationship
    const userPlan = new UserPlan({
      userId: creator,
      planId: planId,
      role: 'creator'
    });

    await userPlan.save();

    res.status(201).json({ 
      message: "Plan created successfully", 
      plan: newPlan,
      userPlan: userPlan 
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
};

// Add a new function to get plans for a specific user
const getUserPlans = async (req, res) => {
  try {
    const { userId } = req.params;

    // Method 1: Get plans where user is creator
    const createdPlans = await Plan.find({ creator: userId });

    const allPlans = [...createdPlans];

    res.status(200).json({
      message: "Plans retrieved successfully",
      plans: allPlans
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
};

// Get all plans function
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find(); // Retrieve all plans from the database
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving plans", error });
  }
};

// Get a specific plan by ID function
const getPlanById = async (req, res) => {
  const { planId } = req.params;
  try {
    const plan = await Plan.findOne({ planId }); // Find the plan with the matching planId
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

    // Find and update plan by ID
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

// Get Plans
const getPlans = async (req, res) => {
  try {
    const userId = req.user._id;
    const plans = await Plan.find({ createdBy: userId });

    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
};

module.exports = { createPlan, getAllPlans, getPlanById, updatePlan, getPlans ,getUserPlans};
