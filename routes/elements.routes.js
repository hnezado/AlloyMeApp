const express = require('express')
const router = express.Router();
const pt = require('periodic-table');

const allElements = pt.all()

router.get('/elements', (req, res, next) => {
  const metals = allElements.filter((elem, index) => {
    return (elem.groupBlock === 'metal' || elem.groupBlock === 'transition metal')
  })
  console.log(metals)
  res.render('allElements', {data: metals})
})

router.get('/elements/json', (req, res, next) => {
  res.send(allElements)
})

module.exports = router;
