var express = require('express');
var router = express.Router();


var signupController = require('../controllers/user/signup');
var loginController = require('../controllers/user/login');

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/logout', function(req, res, next){
    res.send('Logout response');
});

module.exports = router;
