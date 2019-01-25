
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import ENV from 'dotenv';

import meetups from './server/routes/meetups';
import questions from './server/routes/questions';
import users from './server/routes/users';

ENV.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/auth', users);

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