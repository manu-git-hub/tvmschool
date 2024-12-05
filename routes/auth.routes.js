const express = require('express');
const { verifyToken } = require('../middleware/authJwt');
const { isAdmin } = require('../middleware/authJwt');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// Restricted signup route for admin users only
router.post('/signup', [verifyToken, isAdmin], controller.signup);

// Public routes
router.post('/signin', controller.signin);
router.post('/logout', controller.logout);

module.exports = router;
