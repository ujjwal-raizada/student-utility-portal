var express = require('express');
var router = express.Router();

var path = '../controllers/admin/';
var studentsController = require(path + '/studentsController');
var sourcesController = require(path + '/sourcesController');

router.post('/signup', function(req, res, next){
    res.send("Signup functionality for admin");
});
router.post('/login', function(req, res, next){
    res.send("Login functionality for admin");
});
router.get('/students', studentsController);
router.get('/sources', sourcesController);
module.exports = router;
