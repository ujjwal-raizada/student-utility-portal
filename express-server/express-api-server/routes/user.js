var express = require('express');
var router = express.Router();

var path = '../controllers/user/'

var signupController = require(path + '/signupController');
var loginController = require(path + '/loginController');
var profileController = require(path + '/profileController');

/* GET users listing. */
router.post('/profile', profileController);
router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
