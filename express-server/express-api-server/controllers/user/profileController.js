var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

view_profile = function(req, res, next){
    var username = req.body.username;
    var type = req.body.type;
    var res_data = {
        'username' : username,
        'type' : '',
        'sourceSubscription' : [],
        'starList' : [],
        'noticeList' : [],
        'status' : '',
        'message' : '', // status of the query 
    };

    console.log(`Displaying profile of ${username}`);

    async.parallel({
        'Student': function(callback) {
            Student.findOne({'username' : username})
            .exec(callback);
        },
        'OfficialSource': function(callback) {
            OfficialSource.findOne({'username' : username})
            .exec(callback);
        },        
    }, function(err, result){
        if (err) {
            res_data['type'] = undefined;
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'; 
            return res.json(res_data);
        }
        if (result.Student != null) {
            res_data['type'] = 'Student';
            res_data['sourceSubscription'] = result.Student.sourceSubscription;
            res_data['starList'] = result.Student.starList;
        }
        else if (result.OfficialSource != null) {
            res_data['type'] = 'Official Source';
            res_data['sourceSubscription'] = result.OfficialSource.sourceSubscription;
            res_data['starList'] = result.OfficialSource.starList;
            res_data['noticeList'] = result.OfficialSource.noticeList;
        }
        else {
            res_data['type'] = undefined;
            res_data['message'] = 'failure';
        }
        return res.json(res_data);
    });

};

module.exports = view_profile;
