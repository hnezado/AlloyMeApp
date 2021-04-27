const {Schema, model} = require('mongoose')

const alloySchema = new Schema(
  {
    alloyName: {type: String, required: true},
    mixture: {type: [String]}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Alloy', alloySchema)
