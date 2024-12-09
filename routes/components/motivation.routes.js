const express = require('express');
const { authJwt } = require('../../middleware');
const motivationsController = require('../../controllers/components/motivation.controller');
const router = express.Router();

// Faculty-only routes
router.post('/', [authJwt.verifyToken, authJwt.isFaculty], motivationsController.addMotivations);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], motivationsController.editMotivations);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], motivationsController.deleteMotivations);

// Public routes
router.get('/', [authJwt.verifyToken], motivationsController.getMotivationsByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], motivationsController.getAllMotivations);

module.exports = router;
