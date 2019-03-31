var express = require('express');
var router = express.Router();

//Require Controller Modules
var tag_controller = require('../controllers/notice/tag.js');
var notice_controller = require('../controllers/notice/noticeController.js');

//NOTICE ROUTES//

// router.get('/', .get_notice_list);

router.get('/tags', tag_controller.get_tags);
router.post('/createtag', tag_controller.create_tags);

router.get('/getall', notice_controller.get_all_notices);
router.post('/create', notice_controller.create_notice);

module.exports = router;