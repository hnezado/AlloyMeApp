const {Schema, model} = require('mongoose')

const userSchema = new Schema(
  {
    username: {type: String, required: true, createIndexes: true},
    password: {type: String, required: true, createIndexes: true},
    admin: {type: Boolean, default: false},
    knowledgePoints: {type: Number, default: 0},
    // elements: [{type: Schema.Types.ObjectId, ref: 'Element'}],
    comments: {type: [String]}
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('User', userSchema)