const { authJwt } = require('../middleware');
const express = require('express');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.get('/api/test/all', controller.allAccess);
router.get('/api/test/user', authJwt.verifyToken, controller.userBoard);


module.exports = router;
