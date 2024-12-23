// auth-backend/models/plan.js
const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    dateOnTrip: {
      type: Date,
      required: true,
    },
    description: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    planId: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", PlanSchema);
