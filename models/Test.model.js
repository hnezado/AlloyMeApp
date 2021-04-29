const {Schema, model} = require('mongoose')

const testSchema = new Schema(
  {
    question: {type: String, required: true},
    answer: {type: String, required: true}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Test', testSchema)
