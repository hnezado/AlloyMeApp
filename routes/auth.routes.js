const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport')

const User = require('../models/User.model')

// Get sign-in page
router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.post('/signup', (req, res) => {
  const {username, password} = req.body

  // Check if 'user' and 'password' aren't empty
  if (username === '' || password === ''){
    res.render('signup', {errMsg: `Please fill all the fields`})
  }
  // Check if 'user' doesn't exist already
  User.findOne({username})
  .then((result) => {
    if (result) { // This user already exists 
     res.render('signup', {errMsg: `This user already exists`})
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10)
      User.create({username: username, password: hashedPassword})
      .then((result) => {
        res.redirect('/login')
      })
    }
  })
  .catch((err) => {
    console.log(err)
  })
})

// Get login page
router.get('/login', (req, res, next) => {
  res.render('login', {errMsg: req.flash('error')});
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
