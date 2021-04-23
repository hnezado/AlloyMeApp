const express = require('express');
const router = express.Router();
const Element = require('../models/Element.model')
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
  res.render('elements/newElement');
})

router.post('/new', (req, res) => {
  Element.create(req.body)
  .then((result) => {
    User.findByIdAndUpdate(req.user._id, {$push: {elements: result._id}})
    .then((result) => {
      res.redirect('/my-page')
    })
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
})

module.exports = router;
