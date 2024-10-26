const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Keep as String to match your current creator type
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["creator", "participant"],
      default: "creator",
    },
  },
  { timestamps: true }
);

UserPlanSchema.index({ userId: 1, planId: 1 }, { unique: true });

module.exports = mongoose.model("UserPlan", UserPlanSchema);
