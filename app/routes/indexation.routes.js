module.exports = app => {
  const indexations = require('../controllers/indexation.controller.js')

  var router = require('express').Router()

  router.post('/', indexations.create)

  router.get('/', indexations.findAll)

  router.delete('/', indexations.deleteAll)

  app.use('/api/indexations', router)
}
