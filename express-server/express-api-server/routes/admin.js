var express = require('express');
var router = express.Router();

var path = '../controllers/admin/';
var studentsController = require(path + '/studentsController');
var sourcesController = require(path + '/sourcesController');
var signupController = require(path + '/signupController');

router.post('/signup', signupController);
router.post('/login', function(req, res, next){
    res.send("Login functionality for admin");
});
router.get('/students', studentsController);
router.get('/sources', sourcesController);
module.exports = router;
