const express = require('express');
const { authJwt } = require('../../middleware');
const evaluationController = require('../../controllers/components/evaluation.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], evaluationController.addEvaluation);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], evaluationController.editEvaluation);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], evaluationController.deleteEvaluation);

// Public routes
router.get('/', [authJwt.verifyToken], evaluationController.getEvaluationByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], evaluationController.getAllEvaluations);

module.exports = router;
