var Admin = require('../../models/Admin');
var async = require('async');

var validate_login = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : ``,
    };

    console.log('Validating Admin : ' + username + ' Password : ' + password);

    async.parallel({
        'Admin' : function(callback){
            Admin.findOne({'username' : username}, 'password')
            .exec(callback);
            }

    }, function(err, result){
        if(err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            console.log(res_data['status' + ' ' + res_data['message']]);
            return next({...err, res_data});
        }
        if (result.Admin != null){
            if (result.Admin.password == password){
                res_data['status'] = 'success';
                res_data['message'] = 'Admin logged in';
                return res.json(res_data);
            }
            else{
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';
                return res.json(res_data);
            }
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = "Admin doesn't exist";
            return res.json(res_data);
        }
    });
};

module.exports = validate_login;
