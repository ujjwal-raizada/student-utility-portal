var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res, next){
    res.send("signup functionality for admin");
});
router.post('/login', function(req, res, next){
    res.send("Login functionality for admin");
});
router.get('/students', function(req, res, next){
    res.send("Display all the students");
});
router.get('/sources', function(req, res, next){
    res.send("Display all the Official Sources");
});
module.exports = router;
