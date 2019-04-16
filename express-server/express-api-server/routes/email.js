var express = require('express');
var router = express.Router();

var path = '../controllers/email'
var forgotController = require(path + '/forgotController');

router.get('/', function(req, res, next){
    res.json('Email queue.');
});
router.post('/forgot', forgotController.password);

module.exports = router;
