var express = require('express');
var router = express.Router();

var path = '../controllers/admin/';
var studentsController = require(path + '/studentsController');
var sourcesController = require(path + '/sourcesController');
var signupController = require(path + '/signupController');
var loginController = require(path + '/loginController');

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/students', studentsController);
router.get('/sources', sourcesController);
module.exports = router;
