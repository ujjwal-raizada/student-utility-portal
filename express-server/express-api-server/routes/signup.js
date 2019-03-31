var express = require('express');
var router = express.Router();

//Require Controller Modules
var signup_controller = require('../controllers/signupController.js');

//SIGNUP ROUTES//

router.get('/', signup_controller);

module.exports = router;