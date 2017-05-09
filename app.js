const File = require('./controller/fileReader');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const socket_io = require('socket.io');

require('dotenv').config();

const index = require('./routes/index');

const app = express();
const pushMessages = require('./push-messages');

// Socket.io connection
const io = socket_io();
app.io = io;

// Gzip compression added
app.use(compression());

// Send push message to receiers bases on url parameters
app.use('/message/:generator/:message/:priority', function (req, res) {
  res.send(req.params);
  /*
   Parameter description:
   req.params.generator    = generator name
   req.params.message      = status update description
   req.params.priority     = priority of message can be (2, 1, 0, -1, -2) where 2 is the highest priority.

   Function description:
   pushMessages(generator, message, priority)
  */
  pushMessages(req.params.generator, req.params.message, Number(req.params.priority));
});

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
const energyFile = new File('./data/generator-data.csv', io);
energyFile.emitLines();

// Socket connection
io.on('connection', socket => {
  console.log('user connected');
});

module.exports = app;
