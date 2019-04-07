var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

//Check for valid credentials
validate_login = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var res_data = {
        'username' : username,
        'status' : '',
        'message' : ``,
        'type' : '',
    };
    console.log('Validating Login : User : ' + username + ' Password : ' + password);
    
    async.parallel({
        'OfficialSource' : function(callback){
            OfficialSource.findOne({'username' : username}, 'password')
            .exec(callback);
        },
        'Student': function(callback) {
            Student.findOne({'username' : username}, 'password')
            .exec(callback);
        },
    
    }, function(err, result) {
        if(err) {
            res_data['type'] = undefined;
            res_data['status'] = 'failure';
            res_data['message'] = 'Unknown error';
            console.log(res_data['status' + ' ' + res_data['message']]);
            return res.json(res_data);
        }

        if (result.OfficialSource != null){
            if (result.OfficialSource.password == password){
                res_data['type'] = 'Official Source';
                res_data['status'] = 'success';
                res_data['message'] = 'User logged in';
            }
            else{
                res_data['type'] = undefined;
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';                
            }
            console.log(res_data);
            return res.json(res_data);
        }
        else if (result.Student != null) {
            if (result.Student.password == password) {
                res_data['type'] = 'Student';
                res_data['status'] = 'success';
                res_data['message'] = 'User logged in';                
            }
            else{
                res_data['type'] = undefined;
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';                  
            }
            console.log(res_data);
            return res.json(res_data);
        }
        else {
            res_data['type'] = undefined;
            res_data['status'] = 'failure'
            res_data['message'] = `User doesn't exists`;
            console.log(res_data);
            return res.json(res_data);
        }
    });
};

module.exports = validate_login;
