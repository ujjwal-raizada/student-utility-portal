var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var Admin = require('../../models/Admin');
var async = require('async');
var email = require('../../email/main');

exports.password = function(req, res, next){
    let username = req.body.username;
    let res_data = {
        'username' : username,
        'status' : '',
        'message' : '',
    }
    let password = email.generatePassword();

    async.parallel({
        'Student': function(callback){
            Student.findOne({
                'username' : username,
            }).exec(callback);
        },
        'OfficialSource' : function(callback){
            OfficialSource.findOne({
                'username' : username,
            }).exec(callback);
        },
        'Admin' : function(callback){
            Admin.findOne({
                'username' : username,
            }).exec(callback);
        },
    },
    function(err, result){
        if (err){
            res_data['status'] = "failure";
            res_data['message'] = 'Unknown error';
            return res.json(res_data);
        }
        res_data['status'] = 'success';
        res_data['message'] = 'Password changed'

        if (result.Student != null){
            result.Student.updateOne({'password' : password})
            .then(result => {
                email.forgotEmail(username, password);
                return res.json(res_data);
            })
            .catch(err => res.json({'status': 'success'}))
        }
        else if (result.OfficialSource != null){
            result.OfficialSource.updateOne({'password' : password})
            .then(result => {
                email.forgotEmail(username, password);
                return res.json(res_data);
            })
            .catch(err => res.json({'status': 'success'}))
        }
        else if (result.Admin != null) {
            result.Admin.updateOne({'password' : password})
            .then(result => {
                email.forgotEmail(username, password);
                return res.json(res_data);
            })
            .catch(err => res.json({'status': 'success'}))
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = "User doesn't exist"
            console.log(res_data);
            return res.json(res_data);
        }
    })
}
