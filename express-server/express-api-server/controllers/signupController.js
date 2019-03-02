var Admin = require('../models/Admin.js');
var Administration = require('../models/Administration.js');
var Club = require('../models/Club.js');
var Faculty = require('../models/Faculty.js');
var Student = require('../models/Student.js');
var async = require('async');

//Create new user account
exports.create_account = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var type = req.body.type;
	var emailID = req.body.emailID;

	console.log("Creating new account for " + username + "with type " + type);

	async.parallel({
		'admin': function(callback) {
			Admin.findOne({'username' : username})
			.exec(callback);
		},

		'administration': function(callback) {
			Administration.findOne({'username' : username})
			.exec(callback);
		},

		'club': function(callback) {
			Club.findOne({'username' : username})
			.exec(callback);
		},

		'faculty': function(callback) {
			Faculty.findOne({'username' : username})
			.exec(callback);
		},

		'student': function(callback) {
			Student.findOne({'username' : username})
			.exec(callback);
		}
	
	}, function(err, results) {
		if(err){
			return next(err);
		}

		if(results.admin == null){
			if(results.administration == null){
				if(results.club == null){
					if(results.faculty == null){
						if(results.student == null){

							if(type == 'admin'){
								res_data = {
									'username' : username,
									'status' : 'success',
									'message' : 'user created'
								}

								Admin.create({'username' : username, 'password' : password, 'emailID' : emailID}, function(err, instance) {
									if(err)
										return next(err);
								});

								console.log("Successfully created " + type + ' ' + username);
							}

							else if(type == 'administration'){
								res_data = {
									'username' : username,
									'status' : 'success',
									'message' : 'user created'
								}

								Administration.create({'username' : username, 'password' : password, 'emailID' : emailID}, function(err, instance) {
									if(err)
										return next(err);
								});

								console.log("Successfully created " + type + ' ' + username);
							}

							else if(type == 'club'){
								res_data = {
									'username' : username,
									'status' : 'success',
									'message' : 'user created'
								}

								Club.create({'username' : username, 'password' : password, 'emailID' : emailID}, function(err, instance) {
									if(err)
										return next(err);
								});

								console.log("Successfully created " + type + ' ' + username);
							}

							else if(type == 'faculty'){
								res_data = {
									'username' : username,
									'status' : 'success',
									'message' : 'user created'
								}

								Faculty.create({'username' : username, 'password' : password, 'emailID' : emailID}, function(err, instance) {
									if(err)
										return next(err);
								});

								console.log("Successfully created " + type + ' ' + username);
							}

							else if(type == 'student'){
								res_data = {
									'username' : username,
									'status' : 'success',
									'message' : 'user created'
								}

								Student.create({'username' : username, 'password' : password, 'emailID' : emailID}, function(err, instance) {
									if(err)
										return next(err);
								});

								console.log("Successfully created " + type + ' ' + username);
							}

							else {
								res_data = {
									'username' : username,
									'status' : 'failure',
									'message' : 'Invalid user type'
								}

								console.log("Failed Signup Attempt : Invalid User Type");
							}

						}
					}
				}
			}
		}

		else if (username == '' || password == ''){
			console.log('Failed Signup attempt');
			res_data = {
				'username' : username,
				'status' : 'failure',
				'message' : 'Invalid Data'
			}
		}

		else {
			console.log('Failed Signup attempt : User already exists');
			res_data = {
				'username' : username,
				'status' : 'failure',
				'message' : 'username already exists'
			}
		}

		res.json(res_data);
	});
};