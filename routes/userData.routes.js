const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const chalk = require('chalk')

const User = require('../models/User.model')

router.post('/user/new', (req, res, next) => {
  const {username, password, admin} = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  User.create({username: username, password: hashedPassword, admin: admin})
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/user/edit/:_id', (req, res, next) => {
  const {username, password, knowledgePoints, admin, comments} = req.body
  let user = {username, knowledgePoints, admin, comments}
  user.admin = admin ? true : false
  user.comments = comments ? comments : []
  if (password){
    const hashedPassword = bcrypt.hashSync(password, 10)
    user.password = hashedPassword
    User.findByIdAndUpdate(req.params._id, user)
    .then((result) => {
      res.redirect('/admin-page')
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    User.findByIdAndUpdate(req.params._id, user)
    .then((result) => {
      res.redirect('/admin-page')
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

router.post('/user/delete/:_id', (req, res, next) => {
  User.findByIdAndDelete(req.params._id)
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/comments/new', (req, res) => {
  User.findByIdAndUpdate(req.user._id, {$push: req.body})
  .then((result) => {
    console.log(chalk.blue.inverse(`Created new comment`))
    res.redirect('../my-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/comments/edit/:index', (req, res) => {
  User.findById(req.user._id)
  .then((result) => {
    const commentsNew = [...result.comments]
    commentsNew[req.params.index] = req.body.newComment
    User.findByIdAndUpdate(req.user._id, {comments: commentsNew})
    .then((result) => {
      res.redirect('/my-page')
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/comments/delete/:index', (req, res) => {
  User.findById(req.user._id)
  .then((result) => {
    const commentsNew = [...result.comments]
    commentsNew.splice(req.params.index, 1)
    User.findByIdAndUpdate(req.user._id, {comments: commentsNew})
    .then((result) => {
      res.redirect('/my-page')
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/alloy/new', (req, res) => {
  Alloy.create(req.body)
  .then((result) => {

  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;
