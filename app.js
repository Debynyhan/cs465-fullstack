require('dotenv').config();
const express = require('express');

const createError = require('http-errors');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const handlebars = require('hbs');

// Bring in the database
require('./app_api/models/db');

require('./app_api/models/travlr');
require('./app_api/models/user');
require('./app_api/config/passport');


// Define routers
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const roomsRouter = require('./app_server/routes/rooms');
const newsRouter = require('./app_server/routes/news');
const mealsRouter = require('./app_server/routes/meals');
const apiRouter = require('./app_api/routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');

// Define the active handle bar helder
handlebars.registerHelper("activePage", function (title, options) {
  const currentPage = options.data.root.currentPage;

  if (currentPage === title) {
    return new handlebars.SafeString("selected active");

  } else {
    return "";
  }

});

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//console.log('Resolved public path:', path.join(__dirname, 'public'));
app.use(passport.initialize());


// Enable Cors
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/news', newsRouter);
app.use('/meals', mealsRouter);
app.use('/api', apiRouter);


// catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "message": err.name + ": " + err.message });
  }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //console.log(res);
  console.log('No handler found for:', req.method, req.originalUrl);
  next(createError(404));
  //console.log(res);

});





// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //console.log('No handler found for:', req.method, req.originalUrl);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
