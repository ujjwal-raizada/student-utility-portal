var Admin = require('../../models/Admin');
var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

view_profile = function(req, res){
    var username = req.query.username;
    var type = req.query.type;
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
        if (err) next(err);
        res_data = {
            'username' : username,
            'subscription' : [],
            'message' : 'Successful', // status of the query 
        };

        if (result.Student != null) {
            res_data['subscription'] = result.Student.subscription;
        }
        else if (result.OfficialSource != null) {
            res_data['subscription'] = result.OfficialSource.subscription;
            res_data['NoticeList'] = result.OfficialSource.noticeList;
        }
        else res_data['message'] = 'Failed';
        res.json(res_data);
    });

};

module.exports = view_profile;
