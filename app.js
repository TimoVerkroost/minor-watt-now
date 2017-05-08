var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var sockIO = require('socket.io')();
var push = require( 'pushover-notifications' );

require('dotenv').config()

var index = require('./routes/index');

var app = express();

// Gzip compression added
app.use(compression());

// Init socket.io
app.sockIO = sockIO;

// User connects to website
sockIO.on('connection', function (socket) {
  console.log('user connected: ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user exit: ' + socket.id);
  });
  socket.on('reconnection', function(){
    console.log('user reconnected: ' + socket.id);
  });
});

var p = new push( {
  user: process.env['PUSHOVER_API_KEY'],
  token: process.env['PUSHOVER_USER_KEY'],
  // httpOptions: {
  //        proxy: process.env['http_proxy'],
  //},
  // onerror: function(error) {},
  // update_sounds: true // update the list of sounds every day - will
  // prevent app from exiting.
});

var msg = {
  // These values correspond to the parameters detailed on https://pushover.net/api
  // 'message' is required. All other values are optional.
  message: 'omg node test'
};

p.send( msg, function( err, result ) {
  if ( err ) {
    throw err;
  }

  console.log( result );
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
