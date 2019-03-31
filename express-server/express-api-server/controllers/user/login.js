var Admin = require('../../models/Admin');
var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

//Check for valid credentials
validate_login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('Validating Login : User : ' + username + ' Password : ' + password);
    
    async.parallel({
        'Admin': function(callback) {
            Admin.find({'username': username},'password')
            .exec(callback);
        },
        'OfficialSource' : function(callback){
            OfficialSource.find({'username' : username}, 'password')
            .exec(callback);
        },
        'Student': function(callback) {
            Student.find({'username' : username}, 'password')
            .exec(callback);
        },
    
    }, function(err, result) {
        if(err){
            return next(err);
        }

        if(result.admin[0]!=null){
            if(result.admin[0].password == password){
                console.log('Successful Login : Admin ' + username);
                res_data = {
                    'status' : 'success',
                    'username' : username,
                    'type' : 'admin',
                    'message' : `Successful login of ${username}`
                }
            }
            else{
                console.log("Invalid Password for " + username);
                res_data = {
                    'status' : 'failure',
                    'username' : username,
                    'message' : 'Invalid Password'
                }
            }
        }

        else if(result.administration[0]!=null){
            if(result.administration[0].password == password){
                console.log('Successful Login: Administration ' + username);
                res_data = {
                    'status' : 'success',
                    'username' : username,
                    'type' : 'administration',
                    'message' : `Successful login of ${username}`
                }
            }
            else{
                console.log("Invalid Password for " + username);
                res_data = {
                    'status' : 'failure',
                    'username' : username,
                    'message' : 'Invalid Password'
                }
            }
        }

        else if(results.student[0]!=null){
            if(results.student[0].password == password){
                console.log('Successful Login: Student ' + username);
                res_data = {
                    'status' : 'success',
                    'username' : username,
                    'type' : 'student',
                    'message' : `Successful login of ${username}`
                }
            }
            else{
                console.log("Invalid Password for " + username);
                res_data = {
                    'status' : 'failure',
                    'username' : username,
                    'message' : 'Invalid Password'
                }
            }
        }

        else {
            console.log('Failed login attempt : ' + username + ' does not exist');
            res_data = {
                'status' : 'failure',
                'username' : username,
                'message' : `failed login of ${username}`
            }
        }

        res.json(res_data);
    });
};

module.exports = validate_login;
