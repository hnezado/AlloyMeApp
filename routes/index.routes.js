const express = require('express');
const router = express.Router();
const chalk = require('chalk')

const User = require('../models/User.model');

const checkForAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next()
  } else {
    res.redirect('/login')
  }
}

router.get('/', (req, res, next) => {
  let layout = '/layouts/noAuth'
  if (req.user){
    if (req.user.admin){
      layout = '/layouts/adminLayout'
    } else {
      layout = '/layouts/auth'
    }
  }
  res.render('index', {layout})
});


router.get('/my-page', checkForAuth, (req, res, next) => {
  const layout = req.user.admin ? '/layouts/adminLayout' : '/layouts/auth'
  User.findById(req.user._id)
  .then((result) => {
    if (req.user.admin){
      res.redirect('/admin-page')
      next()
    } else {
      res.render('myPage', {data: result, layout});
    }
  })
  .catch((err) => {
    res.render('error')
  })
});

router.get('/admin-page', checkForAuth, (req, res, next) => {
  const layout = '/layouts/adminLayout'
  User.find()
  .then((result) => {
    res.render('adminPage', {data: result, layout})
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;
