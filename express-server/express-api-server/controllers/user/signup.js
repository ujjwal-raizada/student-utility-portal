var Admin = require('../../models/Admin');
var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

//Create new user account
create_account = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;

    console.log("Creating new account for " + username + " with type " + type);

    async.parallel({
        'Student': function(callback) {
            Student.findOne({'username' : username})
            .exec(callback);
        },
        'OfficialSource': function(callback) {
            OfficialSource.findOne({'username' : username})
            .exec(callback);
        },
    
    }, function(err, result) {
        if(err){
            next (err);
        }
       res_data = {
            'username' : username,
            'status' : 'success',
            'message' : 'user created',
        }
        if (result.OfficialSource == null && result.Student == null){
                user_data = {
                    'username' : username, 
                    'password' : password,
                }
                if(type == 'Official Source'){
                    OfficialSource.create(user_data, function(err, instance) {
                        if(err) throw err;
                    });
                }

                else if(type == 'Student'){
                    Student.create(user_data, function(err, instance) {
                        if(err) throw err;
                    });
                }

        }
        else {
            res_data['status'] = 'failure';
            if (username == '' || password == ''){
                console.log('Failed Signup attempt');
                res_data['message'] =  'Cannot leave any of the fields empty';
            }

            else {
                console.log('Failed Signup attempt : User already exists');
                res_data['message'] =  'Username already exists';
            }
        }
        res.json(res_data);
    });
};

module.exports = create_account;
