var Admin = require('../../models/Admin');
var async = require('async');

var create_account = function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var res_data = {};

    console.log("Creating new account for " + username + " with type admin");

    async.parallel({
        'Admin': function(callback) {
            Admin.findOne({'username' : username})
            .exec(callback);
        }
    }, function(err, result){
        if (err) next(err);
        res_data = {
            'username' : username,
            'status' : 'success',
            'message' : 'admin created',
        }
        if (result.Admin == null){
            Admin.create({'username' : username, 'password' : password},
                function (err, instance){
                    if (err) next(err);
                });
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = 'admin already exists'
        }
        console.log(res_data['status'] + ' ' + res_data['message']);                
    });
    res.json(res_data);
};

module.exports = create_account;
