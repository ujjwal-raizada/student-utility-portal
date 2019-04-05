var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')

var userRouter = require('./routes/user');
var noticeRouter = require('./routes/notice');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var passportSetup = require('./config/passport-setup')

var app = express();
app.use(cors())

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://tufty-123:D%40Sunny%40%40%40995970%21@cluster0-g3lgr.mongodb.net/Student-Utility-Portal?retryWrites=true';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/notice', noticeRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
