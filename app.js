var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var done=false;

var app = express();

require('./models/signup');
require('./models/investor');
var passport = require('passport');
var authenticate = require('./routes/authenticate')(passport);
var index = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
mongoose.connect("mongodb://localhost/minorbridge");
var MongoDB = mongoose.connection;

/*MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});
*/
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
 //app.use('/', routes);
// app.use('/users', users);
var api = require('./routes/api');
var initPassport = require('./passport-init');
initPassport(passport);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',api);
app.use('/auth', authenticate);
app.use('/', index);


app.use('/*', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
