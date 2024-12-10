const express = require('express');
const { authJwt } = require('../../middleware');
const teachingAidOthersController = require('../../controllers/components/teachingAidOthers.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], teachingAidOthersController.addTeachingAidOthers);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], teachingAidOthersController.editTeachingAidOthers);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], teachingAidOthersController.deleteTeachingAidOthers);

// Public routes
router.get('/', [authJwt.verifyToken], teachingAidOthersController.getTeachingAidOthersByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], teachingAidOthersController.getAllTeachingAidOthers);

module.exports = router;
