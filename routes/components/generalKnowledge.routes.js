const express = require('express');
const { authJwt } = require('../../middleware');
const generalKnowledgeController = require('../../controllers/components/generalKnowledge.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], generalKnowledgeController.addGeneralKnowledge);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], generalKnowledgeController.editGeneralKnowledge);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], generalKnowledgeController.deleteGeneralKnowledge);

// Public routes
router.get('/', [authJwt.verifyToken], generalKnowledgeController.getGeneralKnowledgeByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], generalKnowledgeController.getAllGeneralKnowledge);

module.exports = router;
