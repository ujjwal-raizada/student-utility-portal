var express = require('express');
var router = express.Router();

//Require Controller Modules
var notice_controller = require('../controllers/noticeController.js');

//NOTICE ROUTES//

router.get('/', notice_controller.get_notice_list);

router.post('/create', notice_controller.create_notice);

module.exports = router;