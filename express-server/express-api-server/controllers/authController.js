const passport = require('passport');

//Auth Login
exports.auth_login = function(req, res) {
  //handle with passport
  res.send("NOT IMPLEMENTED: Authentication based Login");
};

//Auth Login using Google
exports.google_login = function(req, res) {
  passport.authenticate('google', {
    scope: ['profile']
  });
}

exports.logout = function(req, res) {
  //handle with passport
  res.send("NOT IMPLEMENTED: Logout");
}