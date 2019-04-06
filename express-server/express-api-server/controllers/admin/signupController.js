var Admin = require('../../models/Admin');
var async = require('async');

var create_account = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : '',
    }

    console.log("Creating new account for " + username + " with type admin");

    async.parallel({
        'Admin': function(callback) {
            Admin.findOne({'username' : username})
            .exec(callback);
        }
    }, function(err, result){
        if (err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            return next({...err, res_data});
        }
        if (result.Admin == null){
            return Admin.create({'username' : username, 'password' : password},
                function (err, instance){
                    if (err) {
                        res_data['status'] = 'failure'
                        res_data['message'] = 'mongodb error'
                        console.log(res_data['status'] + ' ' + res_data['message']);
                        return next({...err, res_data});
                    }        
                });
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = 'admin already exists'
            return res.json(res_data);
        }
        //console.log(res_data['status'] + ' ' + res_data['message']);                
        
    });
    
};

module.exports = create_account;
