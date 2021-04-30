const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport')

const User = require('../models/User.model')

const checkForAuth = (req,res,next) => {
  if(req.isAuthenticated()){
    res.redirect('/my-page')
  }else{
    return next()
  }
}

router.get('/signup', checkForAuth, (req, res, next) => {
  const layout = '/layouts/noAuth'
  res.render('signup', {layout});
})

router.post('/signup', (req, res) => {
  const layout = '/layouts/noAuth'
  let {username, password} = req.body
  username = username.toLowerCase()
  if (username === '' || password === ''){
    res.render('signup', {errMsg: `Please fill all the fields`, layout})
  } else if (password.length < 4) {
    res.render('signup', {errMsg: `The password length must be higher than 4 characters`, layout})
  }
  User.findOne({username})
  .then((result) => {
    if (result) {
      res.render('signup', {errMsg: `This user already exists`, layout})
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10)
      User.create({username: username, password: hashedPassword})
      .then((result) => {
        res.redirect('/login')
      })
    }
  })
  .catch((err) => {
    res.status(406).send(err)
  })
})

router.get('/login', (req, res, next) => {
  const layout = '/layouts/noAuth'
  res.render('login', {errMsg: req.flash('error'), layout});
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/my-page',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
