const { authJwt } = require('../middleware');
const { updateStatusSchema } = require('../validationSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');
const controller = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

// Get all users (Admin only)
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);

// Update user role (Admin only)
router.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateUserRole);

// Update user status (Admin only)
router.put(
    '/status/:id',
    [authJwt.verifyToken, authJwt.isAdmin, validationMiddleware(updateStatusSchema)],
    controller.updateStatus
  );

// Force delete a user (Admin only)
router.delete('/force-delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.forceDelete);

// Get users by status (Admin only)
router.get('/status', [authJwt.verifyToken, authJwt.isAdmin], controller.getUsersByStatus);

module.exports = router;
