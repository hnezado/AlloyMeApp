const express = require('express');
const UserModel = require('../models/User.model');
const router = express.Router();

// Middleware checkForAuth
const checkForAuth = (req, res, next) => {
  // req.isAuthenticated() Returns true or false (if user is logged in or not)
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

// Get Homepage
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', checkForAuth, (req, res, next) => {
  UserModel.findById(req.user._id)
  .populate('sports')
  .then((result) => {
    res.render('profile', result);
  })
  .catch((err) => {
    res.render('error')
  })
});

module.exports = router;
