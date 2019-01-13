const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const meetups = require('./api/meetups');
const questions = require('./api/questions');
const users = require('./api/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/users', users);

app.get('/', (req, res) => {
  res.json({
    message: 'WELCOME TO QUESTIONER'
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;