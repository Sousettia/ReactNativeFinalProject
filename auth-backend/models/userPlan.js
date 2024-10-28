const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema({
  userId: {
    type: String, // Keep as String to match your current creator type
    required: true,
  },
  plans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan", // Reference to the Plan model
    },
  ],
});

UserPlanSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("UserPlan", UserPlanSchema);
