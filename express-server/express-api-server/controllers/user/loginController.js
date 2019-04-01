var Student = require('../../models/Student');
var OfficialSource = require('../../models/OfficialSource');
var async = require('async');

//Check for valid credentials
validate_login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

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
        if(err) next(err);
        res_data = {
            'status' : 'success',
            'username' : username,
            'message' : `Successful login of ${username}`
        }
        if (result.OfficialSource != null){
            if (result.OfficialSource.password == password){
                res_data['type'] = 'OfficialSource';
            }
            else{
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';                
            }
        }

        else if (result.Student != null) {
            if (result.Student.password == password) {
               res_data['type'] = 'Student';                
            }
            else{
                res_data['status'] = 'failure';
                res_data['message'] = 'Invalid Password';                  
            }
        }

        else {
            console.log('Failed login attempt : ' + username + ' does not exist');
            res_data['message'] = `Failed login of ${username}`;
        }
        console.log(res_data['status'] + ' ' + res_data['message']); 
        res.json(res_data);
    });
};

module.exports = validate_login;
