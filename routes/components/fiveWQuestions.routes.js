const express = require('express');
const { authJwt } = require('../../middleware');
const fiveWQuestionsController = require('../../controllers/components/fiveWQuestions.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], fiveWQuestionsController.addFiveWQuestions);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], fiveWQuestionsController.editFiveWQuestions);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], fiveWQuestionsController.deleteFiveWQuestions);

// Public routes
router.get('/', [authJwt.verifyToken], fiveWQuestionsController.getFiveWQuestionsByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], fiveWQuestionsController.getAllFiveWQuestions);

module.exports = router;
