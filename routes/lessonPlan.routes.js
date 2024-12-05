const express = require('express');
const { authJwt } = require('../middleware');
const lessonPlanController = require('../controllers/lessonPlan.controller');
const router = express.Router();

/**
 * Assign a new lesson plan
 * POST /api/lesson-plans/assign
 */
router.post(
  '/assign',
  [authJwt.verifyToken, authJwt.isAdminOrSupervisor],
  lessonPlanController.assignLessonPlan
);

/**
 * Get all lesson plans
 * GET /api/lesson-plans
 */
router.get(
  '/',
  [authJwt.verifyToken, authJwt.isAdminOrSupervisor],
  lessonPlanController.getAllLessonPlans
);

/**
 * Get a specific lesson plan by ID
 * GET /api/lesson-plans/:id
 */
router.get(
  '/:id',
  [authJwt.verifyToken, authJwt.isAdminOrSupervisor],
  lessonPlanController.getLessonPlanById
);

module.exports = router;
