const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.post('/create', planController.createPlan);
// router.get('/user-plans', planController.getUserPlans);
// router.get('/:planId', planController.getPlanById);
// router.put('/:planId', planController.updatePlan);
// router.delete('/:planId', planController.deletePlan);

module.exports = router;