var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

exports.subscribe = function(req, res, next){
    var username = req.body.username;
    var source = req.body.source;
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
            OfficialSource.findOne({'username' : source})
            .exec(callback);
        },

    }, 
    function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error'
            return res.json(res_data);
        }
        if (result.SourceCheck != null){
            console.log(`${username} subscribing to ${result.SourceCheck.username} ...`);
            
            res_data['status'] = 'success';
            res_data['message'] = 'User subscribed successfully';

            var temp_sub = []; 
            if (result.Student != null) {
                // update the student doc
                temp_sub = result.Student.sourceSubscription;
                if (temp_sub.indexOf(source) < 0) {
                    temp_sub.push(source);
                    result.Student.updateOne({'sourceSubscription' : temp_sub})
                    .then(result => {
                    return res.json(res_data);
                    })
                    .catch(err => res.json({'status': 'failure'})) 
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

                if (temp_sub.indexOf(source) < 0) {
                    temp_sub.push(source);
                    result.OfficialSource.updateOne({'sourceSubscription' : temp_sub})
                    .then(result => {
                        return res.json(res_data);
                        })
                        .catch(err => res.json({'status': 'failure'}))          
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
}

exports.unsubscribe = function(req, res, next){
    var username = req.body.username;
    var source = req.body.source;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : '',
    }

    async.parallel({
        'Student' : function(callback){
            Student.findOne({'username' : username}, 'sourceSubscription')
            .exec(callback);
        },
        'OfficialSource' : function(callback){
            OfficialSource.findOne({'username': username}, 'sourceSubscription')
            .exec(callback);
        },
        'SourceCheck' : function(callback){
            OfficialSource.findOne({'username': source})
            .exec(callback);
        },
    }, function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            return releaseEvents.json(res_data);
        }
        console.log(`${User} trying to unsubscribe ... `);
        var temp_sub = [];
        var get_existingID = undefined;
        var filter_array = [];

        if (result.SourceCheck != null) {
            res_data['status'] = 'success';
            res_data['message'] = 'User subscribed successfully';

            if (res.Student != null) {
                temp_sub = result.Student.sourceSubscription;
                get_existingID = temp_sub.find(element => element == sourceID);

                if (get_existingID){
                    // delete the given sourceID
                    filter_array = temp_sub.filter((value, index, arr) => value != sourceID);
                    result.Student.updateOne({'sourceSubscription' : filter_array}, 
                        function(err, instance){
                            if (err) {
                                res_data['status'] = 'failure';
                                res_data['message'] = 'Error while updating record';
                                return res.json(res_data);
                            }
                        });
                    result.Student.save(); // add callback here 
                    return res.json(res_data);
                }
                else {
                    // given sourceID doesn't exists
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User had never subscribed to the source';
                    return res.json(res_data);
                }
            }
            else if (res.OfficialSource != null){
                temp_sub = result.Student.sourceSubscription;
                get_existingID = temp_sub.find(element => element == sourceID);

                if (get_existingID){
                    // delete the given the sourceID
                    filter_array = temp_sub.filter((value, index, arr) => value != sourceID);
                    result.OfficialSource.updateOne({'sourceSubscription' : filter_array},
                        function(err, instance){
                            if (err) {
                                res_data['status'] = 'failure';
                                res_data['message'] = 'Error while updating record';
                                return res.json(res_data);
                            }
                        });
                    result.OfficialSource.save();
                    return res.json(res_data);
                }
                else {
                    // given sourceID doesn't exists
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User had never subscribed to the source';
                    return res.json(res_data);
                }
            }
            else {
                res_data['status'] = 'failure';
                res_data['message'] = "User doesn't exists"
                return res.json(res_data);
            }
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = "Source doesn't exists";
            return res.json(res_data);
        }
    });
}
