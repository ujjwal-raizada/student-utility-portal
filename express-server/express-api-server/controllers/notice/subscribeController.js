var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

exports.subscribe = function(req, res, next){
    var username = req.body.username;
    var sourceID = req.body.ID;
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
        'SourceCheck' : function(callback){
            OfficialSource.findById({'_id' : sourceID})
            .exec(callback);
        },

    }, 
    function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'
            return next({...err, res_data});
        }
        if (result.SourceCheck != null){
            console.log(`${username} subscribing to ${result.SourceCheck.username} ...`);
            
            res_data['status'] = 'success';
            res_data['message'] = 'User subscribed successfully';

            var temp_sub = []; 
            if (result.Student != null) {
                // update the student doc
                temp_sub = result.Student.sourceSubscription;
                const get_existingID = temp_sub.find(element => element == sourceID);
                if (!get_existingID) {
                    temp_sub.push(sourceID);
                    result.Student.updateOne({'sourceSubscription' : temp_sub});
                    result.Student.save();
                    return res.json(res_data);                 
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User has already subscribed to the Source';
                    return res.json(res_data);
                }

            }
            else if (result.OfficialSource != null){
                // update the official source doc
                temp_sub = result.OfficialSource.sourceSubscription;
                const get_existingID = temp_sub.find(element => element == sourceID);

                if (!get_existingID) {
                    temp_sub.push(sourceID);
                    result.OfficialSource.updateOne({'sourceSubscription' : temp_sub});
                    result.OfficialSource.save(); 
                    return res.json(res_data);               
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User has already subscribed to the Source';
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
};
