const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
router.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateUserRole);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

module.exports = router;
