const express = require('express');
const router = express.Router();
const pt = require('periodic-table');

const allElements = pt.all()

const Alloy = require('../models/Alloy.model')

router.post('/alloy/new', (req, res, next) => {
  console.log(req.body)
  const {alloyName, components} = req.body
  const alloy = {alloyName: '', mixture: []}
  if (alloyName && components){
    if (components instanceof Array){
      alloy.alloyName = alloyName
      components.forEach(component => {
        if (component){
          let comp
          if (component.length > 2){
            comp = allElements.filter((elem, index) => {
              return (elem.name === component)
            })
          } else {
            comp = allElements.filter((elem, index) => {
              return (elem.symbol === component)
            })
          }
          alloy.mixture.push(component)
        }
      })
    }
    if (alloy.mixture.length >= 2){
      Alloy.create(alloy)
      .then((result) => {
        res.redirect('/admin-page')
      })
      .catch((err) => {
        console.log(err)
      })
    } else {res.redirect('/admin-page')}
  } else {res.redirect('/admin-page')}
})

router.post('/alloy/edit/:_id', (req, res, next) => {
  const {alloyName, components} = req.body
  const alloy = {alloyName: '', mixture: []}
  if (alloyName){
    alloy.alloyName = alloyName
    components.forEach(component => {
      if (component){
        let comp
        if (component.length > 2){
          comp = allElements.filter((elem, index) => {
            return (elem.name === component)
          })
        } else {
          comp = allElements.filter((elem, index) => {
            return (elem.symbol === component)
          })
        }
        alloy.mixture.push(component)
      }
    })
    if (alloy.mixture.length >= 2){
      Alloy.findByIdAndUpdate(req.params._id, alloy)
      .then((result) => {
        res.redirect('/admin-page')
      })
      .catch((err) => {
        console.log(err)
      })
    } else {res.redirect('/admin-page')}
  } else {res.redirect('/admin-page')}
})

router.post('/alloy/delete/:_id', (req, res) => {
  Alloy.findByIdAndDelete(req.params._id)
  .then((result) => {
    res.redirect('/admin-page')
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = router;
