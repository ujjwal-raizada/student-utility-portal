const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy({
    //options for google strategy
    clientID: '274366580946-4val450j0djscb5lhfetol7narp1tohu.apps.googleusercontent.com',
    clientSecret: 'Vk0d-a_5ffIV_-K1nencHB-h',
    callbackURL: '/user/login/google/redirect',
    userProfileURL: 'http://localhost:3000/user/login/google'
  }, () => {
    //passport callback function
  })
);