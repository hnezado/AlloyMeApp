const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

// Middleware checkForAuth
const checkForAuth = (req, res, next) => {
  // req.isAuthenticated() Returns true or false (if user is logged in or not)
  if (req.isAuthenticated()) {
      return next()
  } else {
    res.redirect('/')
  }
}

// Get Homepage
router.get('/', (req, res, next) => {
  res.render('index')
});


router.get('/my-page', checkForAuth, (req, res, next) => {
  User.findById(req.user._id)
  .populate('elements')
  .then((result) => {
    res.render('myPage', result);
  })
  .catch((err) => {
    res.render('error')
  })
});

module.exports = router;
