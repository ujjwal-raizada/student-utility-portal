var express = require('express');
var router = express.Router();

//Require Controller Modules
var tag_controller = require('../controllers/notice/tagController.js');
var notice_controller = require('../controllers/notice/noticeController.js');
var subscribe_controller = require('../controllers/notice/subscribeController.js');
var star_controller = require('../controllers/notice/starController.js')

//NOTICE ROUTES//

// router.get('/', .get_notice_list);

router.get('/tags', tag_controller.get_tags);
router.post('/createtag', tag_controller.create_tags);

router.get('/getall', notice_controller.get_all_notices);
router.post('/create', notice_controller.create_notice);
router.get('/id/:noticeID', notice_controller.get_notice);

router.post('/subscribe', subscribe_controller.subscribe);
router.post('/unsubscribe', subscribe_controller.unsubscribe);
router.post('/star', star_controller.star);
router.post('/unstar', star_controller.unstar);

module.exports = router;