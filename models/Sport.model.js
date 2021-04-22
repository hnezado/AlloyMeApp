const {Schema, model} = require('mongoose')

const sportSchema = new Schema(
  {
    sport: {type: String, required: true},
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Sport', sportSchema)
