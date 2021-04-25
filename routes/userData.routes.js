const express = require('express');
const router = express.Router();
const chalk = require('chalk')

const User = require('../models/User.model')

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

module.exports = router;
