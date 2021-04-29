const express = require('express');
const router = express.Router();
const chalk = require('chalk')



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