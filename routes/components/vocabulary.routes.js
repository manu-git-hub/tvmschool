const express = require('express');
const { authJwt } = require('../../middleware');
const vocabularyController = require('../../controllers/components/vocabulary.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], vocabularyController.addVocabulary);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], vocabularyController.editVocabulary);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], vocabularyController.deleteVocabulary);

// Public routes
router.get('/', [authJwt.verifyToken], vocabularyController.getVocabularyByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], vocabularyController.getAllVocabulary);

module.exports = router;
