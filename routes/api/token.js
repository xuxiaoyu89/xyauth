const express = require('express');
const router = express.Router();
const async = require('async');
const AuthController = require('../../controllers/token_controller.js');

// validate an access token
router.get('/token', AuthController.authenticate);


module.exports = router;
