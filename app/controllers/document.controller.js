const db = require('../models')
const Document = db.documents

exports.create = async (req, res) => {
  const documentToAdd = req.body.document

  try {
    const existingItem = await Document.findOne({
      name: documentToAdd.name,
      content: documentToAdd.content,
    })

    if (existingItem) {
      res.status(409).send({message: 'Document already exists'})
    } else {
      const newDocument = new Document({
        name: documentToAdd.name,
        content: documentToAdd.content,
      })

      const savedDocument = await newDocument.save()
      res.status(201).send(savedDocument)
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while saving document',
    })
  }
}
exports.findAll = (req, res) => {
  Document.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while find a word.',
      })
    })
}

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Document.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
        })
      } else {
        res.send({
          message: 'Document was deleted successfully!',
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Document with id=' + id,
      })
    })
}

exports.deleteAll = (req, res) => {
  Document.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Documents were deleted successfully!`,
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all words.',
      })
    })
}
