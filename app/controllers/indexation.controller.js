const db = require('../models')
const Indexation = db.indexations

exports.create = (req, res) => {
  if (!Array.isArray(req.body.indexations)) {
    res.status(400).send({message: 'Invalid request body format'})
    return
  }

  const indexationsToAdd = req.body.indexations
  Promise.all(
    indexationsToAdd.map(async indexation => {
      const existingItem = await Indexation.findOne({
        mot: indexation.mot,
        lemma: indexation.lemma,
        occurrence: indexation.occurrence,
        document: indexation.document,
      })

      if (!existingItem) {
        const newIndexation = new Indexation({
          mot: indexation.mot,
          lemma: indexation.lemma,
          occurrence: indexation.occurrence,
          document: indexation.document,
        })

        try {
          const savedIndexation = await newIndexation.save()
          return savedIndexation
        } catch (err) {
          return {
            message: err.message || 'Error while saving indexation',
            status: 500,
          }
        }
      }
    }),
  )
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while processing indexations.',
      })
    })
}

exports.findAll = (req, res) => {
  const mot = req.query.mot
  var condition = mot ? {mot: {$regex: new RegExp(mot), $options: 'i'}} : {}

  Indexation.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while find a word.',
      })
    })
}

exports.deleteAll = (req, res) => {
  Indexation.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Indexations were deleted successfully!`,
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all words.',
      })
    })
}
