var express = require('express');
var router = express.Router();

//Require Controller Modules
var tag_controller = require('../controllers/notice/tag.js');

//NOTICE ROUTES//

// router.get('/', .get_notice_list);

router.get('/tags', tag_controller.get_tags);

router.post('/createtag', tag_controller.create_tags);

module.exports = router;