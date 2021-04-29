const express = require('express');
const router = express.Router();
const chalk = require('chalk')

const Test = require('../models/Test.model');
const User = require('../models/User.model');

const checkForAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next()
  } else {
    res.redirect('/login')
  }
}

router.get('/test', checkForAuth, (req, res) => {
  User.findById(req.user._id)
  .then((userResult) => {
    layout = userResult.admin ? '/layouts/adminLayout' : '/layouts/auth' 
    Test.find()
    .then((result) => {
      const randomNum = Math.floor(Math.random()*result.length)    
      let testId = result[randomNum]._id
      Test.findById(testId)
      .then((result) => {
        res.render('test', {data: result, layout})
      })
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/answer/:_id', (req, res) => {
  layout = '/layouts/auth'
  let questionId= req.params._id
  let answer = req.body.answer.toLowerCase()
  Test.findById(questionId)
  .then((testResult) => {
    if (testResult.answer === answer) {
      User.findById(req.user._id)
        .then((user) =>{
          User.findByIdAndUpdate(req.user._id, {knowledgePoints: user.knowledgePoints + 5})
            .then((userResult) => {
              res.redirect('/my-page')
          })
        })
    } else {
      res.render('test', {data: testResult, correct: `Wrong answer!`, layout})
    }
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/test/new', (req, res) => {
  const {question, answer} = req.body
  Test.create({question, answer: answer.toLowerCase()})
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/test/delete/:_id', (req, res) => {
  Test.findByIdAndDelete(req.params._id)
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;