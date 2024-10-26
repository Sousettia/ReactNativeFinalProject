const Plan = require("../models/plans"); // Import Plan model
const { v4: uuidv4 } = require('uuid');
// Create Plan
const createPlan = async (req, res) => {
  try {
    const { planName, budget, dateOnTrip, description ,planId, creator} = req.body;

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
      creator,
    });

    await newPlan.save();
    res
      .status(201)
      .json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
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

module.exports = { createPlan, updatePlan, getPlans };
