var express = require('express');
var router = express.Router();

//Require Controller Modules
var auth_controller = require("../controllers/authController.js");

//auth login
router.get('/login', auth_controller.auth_login);

//auth login with google
router.get('/login/google', auth_controller.google_login);

//auth login with google
router.get('/logout', auth_controller.logout);

module.exports = router;