const express = require('express');
const { authJwt } = require('../../middleware');
const learningOutcomeController = require('../../controllers/components/learningOutcome.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], learningOutcomeController.addLearningOutcomes);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], learningOutcomeController.editLearningOutcomes);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], learningOutcomeController.deleteLearningOutcomes);

// Public routes
router.get('/', [authJwt.verifyToken], learningOutcomeController.getLearningOutcomesByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], learningOutcomeController.getAllLearningOutcomes);

module.exports = router;
