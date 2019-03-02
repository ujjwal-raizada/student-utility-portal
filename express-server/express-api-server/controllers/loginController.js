var Admin = require('../models/Admin.js');
var Administration = require('../models/Administration.js');
var Club = require('../models/Club.js');
var Faculty = require('../models/Faculty.js');
var Student = require('../models/Student.js');
var async = require('async');

//Check for valid credentials
exports.validate_login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	console.log('Validating Login : User : ' + username + ' Password : ' + password);
	
	async.parallel({
		'admin': function(callback) {
			Admin.find({'username': username},'password')
			.exec(callback);
		},

		'administration': function(callback) {
			Administration.find({'username' : username}, 'password')
			.exec(callback);
		},

		'club': function(callback) {
			Club.find({'username' : username}, 'password')
			.exec(callback);
		},

		'faculty': function(callback) {
			Faculty.find({'username' : username}, 'password')
			.exec(callback);
		},

		'student': function(callback) {
			Student.find({'username' : username}, 'password')
			.exec(callback);
		}
	
	}, function(err, results) {
		if(err){
			return next(err);
		}

		if(results.admin[0]!=null){
			if(results.admin[0].password == password){
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

		else if(results.administration[0]!=null){
			if(results.administration[0].password == password){
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

		else if(results.club[0]!=null){
			if(results.club[0].password == password){
				console.log('Successful Login: Club ' + username);
				res_data = {
					'status' : 'success',
					'username' : username,
					'type' : 'club',
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

		else if(results.faculty[0]!=null){
			if(results.faculty[0].password == password){
				console.log('Successful Login: Faculty ' + username);
				res_data = {
					'status' : 'success',
					'username' : username,
					'type' : 'faculty',
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