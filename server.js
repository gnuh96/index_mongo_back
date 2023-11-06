const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({limit: '50mb'}))

const db = require('./app/models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to application.'})
})

require('./app/routes/indexation.routes')(app)
require('./app/routes/document.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8085
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
