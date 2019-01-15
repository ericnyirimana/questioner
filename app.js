const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

const meetups = require('./server/controllers/meetups');
const questions = require('./server/controllers/questions');
const users = require('./server/controllers/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

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