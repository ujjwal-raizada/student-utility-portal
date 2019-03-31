var express = require('express');
var router = express.Router();

var path = '../controllers/user/'

var signupController = require(path + '/signup');
var loginController = require(path + '/login');
var profileController = require(path + '/profile');

/* GET users listing. */
router.get('/profile', profileController);
router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
