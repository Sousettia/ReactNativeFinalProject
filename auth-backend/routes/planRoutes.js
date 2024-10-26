const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.post("/create", planController.createPlan);
router.get("/all-plans", planController.getAllPlans); // Route to get all plans
router.get("/:planId", planController.getPlanById); // Route to get a single plan by planId
router.get("/users/:userId/plans", planController.getUserPlans);
// router.put('/:planId', planController.updatePlan);
// router.delete('/:planId', planController.deletePlan);

module.exports = router;
