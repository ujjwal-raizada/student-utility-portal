var Admin = require('../../models/Admin');
var async = require('async');

var validate_login = function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var res_data = {
        'username' : username,
        'status' : 'successful',
        'message' : `login of ${username}`,
    };

    console.log('Validating Admin : ' + username + ' Password : ' + password);

    async.parallel({
        'Admin' : function(callback){
            Admin.findOne({'username' : username}, 'password')
            .exec(callback);
            }

    }, function(err, result){
        if (err) next(err);
        if (result.Admin != null){
            if (result.Admin.password == password){}
            else{
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';
            }
        }
        else {
            res_data['status'] = 'failure';
            res_data['message'] = "Admin with this username doesn't exist";
        }
        console.log(res_data['status'] + ' ' + res_data['message'])
        res.json(res_data);
    });
};

module.exports = validate_login;
