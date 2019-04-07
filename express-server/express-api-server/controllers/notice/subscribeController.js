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
            res_data['message'] = 'User unsubscribed successfully';

            var temp_sub = []; 
            if (result.Student != null) {
                // update the student doc
                temp_sub = result.Student.sourceSubscription;
                if (temp_sub.indexOf(source) >= 0) {
                    // temp_sub.push(source);
                    temp_sub.splice( temp_sub.indexOf(source), 1 );
                    result.Student.updateOne({'sourceSubscription' : temp_sub})
                    .then(result => {
                    return res.json(res_data);
                    })
                    .catch(err => res.json({'status': 'failure'})) 
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User not subscribed to the Source';
                    return res.json(res_data);
                }

            }
            else if (result.OfficialSource != null){
                // update the official source doc
                temp_sub = result.OfficialSource.sourceSubscription;

                if (temp_sub.indexOf(source) >= 0) {
                    temp_sub.splice( temp_sub.indexOf(source), 1 );
                    result.OfficialSource.updateOne({'sourceSubscription' : temp_sub})
                    .then(result => {
                        return res.json(res_data);
                        })
                        .catch(err => res.json({'status': 'failure'}))          
                }
                else {
                    res_data['status'] = 'failure';
                    res_data['message'] = 'User not subscribed to the Source';
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
