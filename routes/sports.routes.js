const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport.model')
const User = require('../models/User.model')

// Middleware checkForAuth
const checkForAuth = (req, res, next) => {
  // req.isAuthenticated() Returns true or false (if user is logged in or not)
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

// Get Sports page
router.get('/new', checkForAuth, (req, res, next) => {
  res.render('sports/newSport');
})

router.post('/new', (req, res) => {
  Sport.create(req.body)
  .then((result) => {
    User.findByIdAndUpdate(req.user._id, {$push: {sports: result._id}})
    .then((result) => {
      res.redirect('/profile')
    })
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
})

module.exports = router;
