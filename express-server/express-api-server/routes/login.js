var express = require('express');
var router = express.Router();

//Require Controller Modules
var login_controller = require('../controllers/loginController.js');

//LOGIN ROUTES//

router.post('/', login_controller.validate_login);

module.exports = router;