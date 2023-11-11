module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      mot: String,
      lemma: String,
      occurrence: String,
      document: String,
    },
    {timestamps: true},
  )

  schema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
  })

  const Indexation = mongoose.model('indexation', schema)
  return Indexation
}
