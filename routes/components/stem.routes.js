const express = require('express');
const { authJwt } = require('../../middleware');
const stemController = require('../../controllers/components/stem.controller');
const router = express.Router();

// Faculty-only routes
router.post('/add', [authJwt.verifyToken, authJwt.isFaculty], stemController.addSTEM);
router.put('/', [authJwt.verifyToken, authJwt.isFaculty], stemController.editSTEM);
router.delete('/', [authJwt.verifyToken, authJwt.isFaculty], stemController.deleteSTEM);

// Public routes
router.get('/', [authJwt.verifyToken], stemController.getSTEMByQuery);
router.get('/all', [authJwt.verifyToken, authJwt.isAdminOrSupervisor], stemController.getAllSTEM);

module.exports = router;
