var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var Notice = require('../../models/Notice');
var async = require('async');

exports.star = function(req, res, next){
    var username = req.body.username;
    var noticeid = req.body.noticeid;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : '',
    }
    async.parallel({
        'Student' : function(callback){
            Student.findOne({'username' : username})
            .exec(callback);
        },
        'OfficialSource' : function(callback){
            OfficialSource.findOne({'username' : username})
            .exec(callback);
        },
        'NoticeCheck' : function(callback){
            Notice.findOne({'_id' : noticeid})
            .exec(callback);
        },

    }, 
    function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'
            return res.json(res_data);
        }
        if (result.NoticeCheck != null){
            console.log(`${username} staring notice id: ${noticeid} ...`);
            
            res_data['status'] = 'success';
            res_data['message'] = 'User starred notice successfully';

            var temp_sub = []; 
            if (result.Student != null) {
                // update the student doc
                temp_sub = result.Student.starNotice;
                if (temp_sub.indexOf(noticeid) < 0) {
                    temp_sub.push(noticeid);
                    result.Student.updateOne({'starNotice' : temp_sub})
                    .then(result => {
                    return res.json(res_data);
                    })
                    .catch(err => res.json({'status': 'failure'})) 
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User has already starred this notice';
                    return res.json(res_data);
                }

            }
            else if (result.OfficialSource != null){
                // update the official source doc
                temp_sub = result.OfficialSource.starNotice;

                if (temp_sub.indexOf(noticeid) < 0) {
                    temp_sub.push(noticeid);
                    result.OfficialSource.updateOne({'starNotice' : temp_sub})
                    .then(result => {
                        return res.json(res_data);
                        })
                        .catch(err => res.json({'status': 'failure'}))          
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User has already starred this notice';
                    return res.json(res_data);
                }
            }
            else {
                log = `User could not be found with username ${username}`;
                res_data['status'] = 'failure';
                res_data['message'] = log;            
                console.log(log);
                return res.json(res_data);
            }
        }
        else {
            log = 'No such Official Source exists !';
            res_data['status'] = 'failure';
            res_data['message'] = log;
            console.log(log);
            return res.json(res_data);
        }
    });
}

exports.unstar = function(req, res, next){
    var username = req.body.username;
    var noticeid = req.body.noticeid;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : '',
    }
    async.parallel({
        'Student' : function(callback){
            Student.findOne({'username' : username})
            .exec(callback);
        },
        'OfficialSource' : function(callback){
            OfficialSource.findOne({'username' : username})
            .exec(callback);
        },
        'NoticeCheck' : function(callback){
            Notice.findOne({'_id' : noticeid})
            .exec(callback);
        },

    }, 
    function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'
            return res.json(res_data);
        }
        if (result.NoticeCheck != null){
            console.log(`${username} unstarring.`);
            
            res_data['status'] = 'success';
            res_data['message'] = 'User unstarred successfully';

            var temp_sub = []; 
            if (result.Student != null) {
                // update the student doc
                temp_sub = result.Student.starNotice;
                if (temp_sub.indexOf(noticeid) >= 0) {
                    // temp_sub.push(source);
                    temp_sub.splice( temp_sub.indexOf(noticeid), 1 );
                    result.Student.updateOne({'starNotice' : temp_sub})
                    .then(result => {
                    return res.json(res_data);
                    })
                    .catch(err => res.json({'status': 'failure'})) 
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User not starred this notice.';
                    return res.json(res_data);
                }

            }
            else if (result.OfficialSource != null){
                // update the official source doc
                temp_sub = result.OfficialSource.starNotice;

                if (temp_sub.indexOf(noticeid) >= 0) {
                    temp_sub.splice( temp_sub.indexOf(noticeid), 1 );
                    result.OfficialSource.updateOne({'starNotice' : temp_sub})
                    .then(result => {
                        return res.json(res_data);
                        })
                        .catch(err => res.json({'status': 'failure'}))          
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User not starred this notice.';
                    return res.json(res_data);
                }
            }
            else {
                log = `User could not be found with username ${username}`;
                res_data['status'] = 'failure';
                res_data['message'] = log;            
                console.log(log);
                return res.json(res_data);
            }
        }
        else {
            log = 'No such Official Source exists !';
            res_data['status'] = 'failure';
            res_data['message'] = log;
            console.log(log);
            return res.json(res_data);
        }
    });
}
