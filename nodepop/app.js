var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('./lib/i18nConfigure');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
const LoginController = require('./controllers/LoginController');
const swaggerMiddleware = require('./lib/swaggerMiddleware');

require('./lib/connectMongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Global variable to be use in the view engine
app.locals.title = 'QuantumPop';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();

/**
 * API routes
 */
app.use('/apiv1-docs/', swaggerMiddleware);
app.use('/apiv1/ads', jwtAuthMiddleware, require('./routes/api/ads'));
app.post('/apiv1/login', loginController.postAPI);

// localization setup
app.use(i18n.init);

/**
 *  Website routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // validation errors
  if (err.array) {
    const errorInfo = err.errors[0];
    err.message = `Error in ${errorInfo.location}, parametro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // Check for API errors
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
