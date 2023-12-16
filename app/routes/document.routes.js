module.exports = app => {
  const documents = require('../controllers/document.controller.js')

  var router = require('express').Router()

  router.get('/', documents.findAll)
  router.get('/:name', documents.findByName)
  router.post('/', documents.create)

  router.delete('/', documents.deleteAll)

  app.use('/api/documents', router)
}
