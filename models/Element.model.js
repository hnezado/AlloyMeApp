const {Schema, model} = require('mongoose')

const elementSchema = new Schema(
  {
    element: {type: String, required: true},
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Element', elementSchema)
