const dbConfig = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.indexations = require('./indexation.model.js')(mongoose)
db.documents = require('./document.model.js')(mongoose)

module.exports = db
