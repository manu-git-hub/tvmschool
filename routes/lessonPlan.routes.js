const express = require('express');
const { authJwt } = require('../middleware');
const lessonPlanController = require('../controllers/lessonPlan.controller');
const router = express.Router();

router.post(
  '/assign',
  [authJwt.verifyToken, authJwt.isAdminOrSupervisor], // Middleware for role verification
  lessonPlanController.assignLessonPlan // Controller function
);

module.exports = router;
