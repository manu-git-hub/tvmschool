const express = require('express');
const { authJwt } = require('../../middleware');
const activitiesHomeworkController = require('../../controllers/components/activitiesHomework.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], activitiesHomeworkController.addActivitiesHomework);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], activitiesHomeworkController.editActivitiesHomework);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], activitiesHomeworkController.deleteActivitiesHomework);

// Public routes
router.get('/', [authJwt.verifyToken], activitiesHomeworkController.getActivitiesHomeworkByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], activitiesHomeworkController.getAllActivitiesHomework);

module.exports = router;
