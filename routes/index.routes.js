const express = require('express');
const router = express.Router();
const chalk = require('chalk')
const pt = require('periodic-table');

const allElements = pt.all()

const User = require('../models/User.model');
const Alloy = require('../models/Alloy.model');
const Test = require('../models/Test.model');

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
  .then((userResult) => {
    const fixedName = userResult.username[0].toUpperCase()+userResult.username.slice(1)
    if (req.user.admin){
      res.redirect('/admin-page')
      next()
    } else {
      Alloy.find()
      .then((alloysResult) => {
        res.render('myPage', {
          userName: fixedName,
          userData: userResult, 
          alloysData: alloysResult, 
          elementsData: allElements,
          layout});
      })
    }
  })
  .catch((err) => {
    res.render('error')
  })
});

router.get('/admin-page', checkForAuth, (req, res, next) => {
  if (req.user.admin){
    const layout = '/layouts/adminLayout'
    User.find()
    .then((usersResult) => {
      Alloy.find()
      .then((alloysResult) => {
        Test.find()
        .then((testsResult) => {
          res.render('adminPage', {
            usersData: usersResult,
            alloysData: alloysResult,
            testsData: testsResult,
            elements: allElements, 
            layout})
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    res.redirect('/my-page')
  }
})

module.exports = router;
