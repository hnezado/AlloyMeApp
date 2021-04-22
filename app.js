require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// Step 2: Import installed packages (to use passport and more)
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Step 9: Import model "User.model"
const User = require('./models/User.model')

// DB config
mongoose
  .connect('mongodb://localhost/passport-example', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Express
const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Step 3: Config middle-ware "express-session"
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

// Step 4: Config user serialization
passport.serializeUser((user, callback) => {
  callback(null, user._id)
})

// Step 5: Config user de-serialization
passport.deserializeUser((id, callback) => {
  User.findById(id)
  .then((result) => {
    callback(null, result)
  })
  .catch((err) => {
    callback(err)
  })
})

// Step 6: Config middle-ware "flash"
app.use(flash())

// Step 7: Config middle-ware "Strategy"
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({username})
  .then((user) => {
    if (!user){ // If the user doesn't exist
      return next(null, false, {message: 'Incorrect username'})
    }

    if (!bcrypt.compareSync(password, user.password)){ // If the password is correct
      return next(null, false, {message: 'Incorrect password'})
    }
    return next(null ,user) // If the login is successful, it passes "user"
  })
  .catch((err) => {
    console.log(err)
  })
}))

// Step 10: Config middle-ware "passport"
app.use(passport.initialize())
app.use(passport.session())

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Routes
app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/sports', require('./routes/sports.routes'));

// Listener
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
