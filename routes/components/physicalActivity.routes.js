const express = require('express');
const { authJwt } = require('../../middleware');
const physicalActivityController = require('../../controllers/components/physicalActivity.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], physicalActivityController.addPhysicalActivities);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], physicalActivityController.editPhysicalActivities);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], physicalActivityController.deletePhysicalActivities);

// Public routes
router.get('/', [authJwt.verifyToken], physicalActivityController.getPhysicalActivitiesByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], physicalActivityController.getAllPhysicalActivities);

module.exports = router;
