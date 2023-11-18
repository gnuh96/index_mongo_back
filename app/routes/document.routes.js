module.exports = app => {
  const documents = require('../controllers/document.controller.js')

  var router = require('express').Router()

  router.get('/', documents.findAll)
  router.post('/', documents.create)

  router.delete('/', documents.deleteAll)

  app.use('/api/documents', router)
}
