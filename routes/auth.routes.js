const express = require('express');
const { signinSchema, signupSchema } = require('../validationSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// Restricted signup route for admin users only
router.post(
  '/signup',
  [verifyToken, isAdmin, validationMiddleware(signupSchema)],
  controller.signup
);

// Public routes
router.post('/signin', validationMiddleware(signinSchema), controller.signin);
router.post('/logout', controller.logout);

module.exports = router;
