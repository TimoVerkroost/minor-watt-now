const File = require('./controller/fileReader');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const socket_io = require('socket.io');

// Get environment variables
require('dotenv').config();

const index = require('./routes/index');

const app = express();
// Get push messages function
const messages = require('./messages');
const pushMessages = require('./push-messages');

// Socket.io connection
const io = socket_io();
app.io = io;

// Gzip compression added
app.use(compression());

// Send push message to receivers bases on url parameters
/*
 Parameter description:
 req.params.generator              = generator name
 messages.MESSAGENAME.message      = status update description
 messages.MESSAGENAME.priority     = priority of message can be (2, 1, 0, -1, -2) where 2 is the highest priority.

 Function description:
 pushMessages(generator, message, priority)
*/
// BEGIN OF DEMO PUSH NOTIFICATIONS
// peak demo
app.use('/demo/peak/:generator', function (req, res) {
  res.send(req.params);
  io.emit('peak', req.params.generator, messages.peak.message, messages.peak.priority);
  pushMessages(req.params.generator, messages.peak.message, messages.peak.priority);
});

// overheating demo
app.use('/demo/overheating/:generator', function (req, res) {
  res.send(req.params);
  io.emit('overheating', req.params.generator, messages.overheating.message, messages.overheating.priority);
  pushMessages(req.params.generator, messages.overheating.message, messages.overheating.priority);
});

// efficientLow demo
app.use('/demo/efficient-low/:generator', function (req, res) {
  res.send(req.params);
  io.emit('efficientLow', req.params.generator, messages.efficientLow.message, messages.efficientLow.priority);
  pushMessages(req.params.generator, messages.efficientLow.message, messages.efficientLow.priority);
});

// broadbandLow demo
app.use('/demo/broadband-low/:generator', function (req, res) {
  res.send(req.params);
  io.emit('broadbandLow', req.params.generator, messages.broadbandLow.message, messages.broadbandLow.priority);
  pushMessages(req.params.generator, messages.broadbandLow.message, messages.broadbandLow.priority);
});

// additionalGenerator demo
app.use('/demo/power/:generator', function (req, res) {
  res.send(req.params);
  io.emit('additionalGenerator', req.params.generator, messages.additionalGenerator.message, messages.additionalGenerator.priority);
  pushMessages(req.params.generator, messages.additionalGenerator.message, messages.additionalGenerator.priority);
});

// lostConnection demo
app.use('/demo/lost-connection/:generator', function (req, res) {
  res.send(req.params);
  io.emit('lostConnection', req.params.generator, messages.lostConnection.message, messages.lostConnection.priority);
  pushMessages(req.params.generator, messages.lostConnection.message, messages.lostConnection.priority);
});

// fuelLow demo
app.use('/demo/fuel/:generator', function (req, res) {
  res.send(req.params);
  io.emit('fuelLow', req.params.generator, messages.fuelLow.message, messages.fuelLow.priority);
  pushMessages(req.params.generator, messages.fuelLow.message, messages.fuelLow.priority);
});

// unknownError demo
app.use('/demo/fuel/:generator', function (req, res) {
  res.send(req.params);
  io.emit('unknownError', req.params.generator, messages.unknownError.message, messages.unknownError.priority);
  pushMessages(req.params.generator, messages.unknownError.message, messages.unknownError.priority);
});
// END OF DEMO PUSH NOTIFICATIONS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/images/icons', 'favicon-96x96.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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

// Reading energy generator data
const energyFile = new File('./data/real-data/spiked_filtered_total_data.csv', io);
energyFile.emitLines();

// Socket connection
io.on('connection', socket => {
  console.log('user connected');
  socket.emit('backupdata', energyFile.getBackUp())
});

module.exports = app;
