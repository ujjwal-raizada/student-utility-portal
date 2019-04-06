var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

exports.star = function(req, res, next){
    var username = req.body.username;
    var noticeSource = req.body.source;
    var noticeID = req.body.id;
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
            OfficialSource.findOne({'username' : noticeSource}, 'noticeList')
            .exec(callback);
        },

    }, function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'
            return next({...err, res_data});
        }
        if (result.NoticeCheck != null){
            console.log(`${username} starring a notice of ${noticeSource} with noticeID ${noticeID}`);

            var temp_notice = result.NoticeCheck.noticeList;
            const get_existingNotice = temp_notice.find(element => element == noticeID);

            if (!get_existingNotice){

                res_data['status'] = 'success';
                res_data['message'] = 'User starred the notice successfully';

                var temp_sub = [];
                if (result.Student != null) {
                    // update the student doc
                    temp_sub = result.Student.starNotice;
                    const get_existingID = temp_sub.find(element => element == noticeID);
                    if (!get_existingID) {
                        temp_sub.push(noticeID);
                        result.Student.updateOne({'starNotice' : temp_sub});
                        result.Student.save();
                        return res.json(res_data);
                    }
                    else {
                        res_data['status'] = 'failure';
                        res_data['message'] = 'User has already starred the notice';
                        return res.json(res_data);
                        
                    }

                }
                else if (result.OfficialSource != null){
                    // update the official source doc
                    temp_sub = result.OfficialSource.starNotice;
                    const get_existingID = temp_sub.find(element => element == noticeID);

                    if (!get_existingID ) {
                        temp_sub.push(noticeID);
                        result.OfficialSource.updateOne({'starNotice' : temp_sub});
                        result.OfficialSource.save();
                        return res.json(res_data);
                    }
                    else {
                        res_data['status'] = 'failure';
                        res_data['message'] = 'User has already starred the notice';
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
            else{
                log = "Either the notice has been deleted or it doesn't exists";
                res_data['status'] = 'failure';
                res_data['message'] = log;
                console.log(log);
                return res.json(res_data);
            }

        }
        else {
            log = `The Official Source with username ${noticeSource} doesn't exists`;
            res_data['status'] = 'failure';
            res_data['message'] = log;
            console.log(log);
            return res.json(res_data);
        }
    });
};
