const {Schema, model} = require('mongoose')

const userSchema = new Schema(
  {
    username: {type: String, required: true, createIndexes: true},
    password: {type: String, required: true, createIndexes: true},
    elements: [{type: Schema.Types.ObjectId, ref: 'Element'}],
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('User', userSchema)