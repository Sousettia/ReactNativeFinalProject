const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.post("/create", planController.createPlan);
router.get("/all-plans", planController.getAllPlans);
router.get("/:planId", planController.getPlanById);
router.get("/users/:userId/plans", planController.getUserPlans);
router.delete("/users/:userId/plans/:planId", planController.deletePlan); // Route to delete a plan by user and plan ID
router.post("/users/:userId/plans/:planId", planController.addPlanToUser); // Route to add an existing plan to a user
// router.put('/:planId', planController.updatePlan);

module.exports = router;
