var express = require('express');
var router = express.Router();

var path = '../controllers/admin/';
var studentsController = require(path + '/studentsController');
var sourcesController = require(path + '/sourcesController');
var signupController = require(path + '/signupController');
var loginController = require(path + '/loginController');
var tagController = require(path + '/tagController');

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/addtag', tagController.addtag);
router.post('/deletetag', tagController.deletetag);
router.get('/students', studentsController);
router.get('/sources', sourcesController);
module.exports = router;
