var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

//Create new user account
create_account = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
    var res_data = {
        'username' : username,
        'type' : type,
        'status' : '',
        'message' : '',
    }
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
        if(err) {
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            console.log(res_data);
            return res.json(res_data);
        }
        if (result.OfficialSource == null && result.Student == null){
            user_data = {
                'username' : username, 
                'password' : password,
            }
            if (username == '' || password == ''){
                res_data['status'] = 'failure';
                res_data['message'] =  'Cannot leave any of the fields empty';
                console.log(res_data);
                return res.json(res_data);
            }
            else if(type == 'Official Source'){
                OfficialSource.create(user_data, function(err, instance) {
                    if(err) {
                        res_data['status'] = 'failure'
                        res_data['message'] = 'mongodb error'
                        console.log(res_data['status'] + ' ' + res_data['message']);
                        return res.json(res_data);
                    }
                    else {
                        res_data['status'] = 'success';
                        res_data['message'] = 'Official User created';
                        console.log(res_data);
                        return res.json(res_data)
                    }
                });
            }
            else if(type == 'Student'){
                Student.create(user_data, function(err, instance) {
                    if(err) {
                        res_data['status'] = 'failure'
                        res_data['message'] = 'mongodb error'
                        console.log(res_data['status'] + ' ' + res_data['message']);
                        return res.json(res_data);
                    }
                    else{
                        res_data['status'] = 'success'
                        res_data['message'] = 'Official User created';
                        console.log(res_data);
                        return res.json(res_data)                            
                    }
                });
            }
        }
        else {
            console.log('Failed Signup attempt : User already exists');
            res_data['status'] = 'failure';
            res_data['message'] =  'Username already exists';
            return res.json(res_data)
        }
        
    });
    
};

module.exports = create_account;
