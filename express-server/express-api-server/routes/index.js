var express = require('express');
var router = express.Router();


//LOGIN ROUTES//

router.get('/', function a(req, res) {
    res.send('Welcome to Student Util Portal. This is the Backend API');
});

module.exports = router;