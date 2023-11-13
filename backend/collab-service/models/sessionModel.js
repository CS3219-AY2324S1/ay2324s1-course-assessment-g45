const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  username :{
    type: String,
    required: true,
  },
  isActive : {
    type: Boolean,
    default: true,
  }
})

const sessionSchema = new Schema({
  data: {
    type: String,
    defaultValue: '',
  },
  language: {
    id: {
      type: Number,
      defaultValue: 63,
    },
    name: {
      type: String,
      defaultValue: 'JavaScript (Node.js 12.14.0)',
    },
    label: {
      type: String,
      defaultValue: 'JavaScript (Node.js 12.14.0)',
    },
    value: {
      type: String,
      defaultValue: 'javaScript',
    },
  },
  questionId: {
    type: String,
    required: true,
  },
  user1 :{
    type: userSchema,
    required: true,
  },
  user2 : {
    type: userSchema,
    required: true,
  },
  chat : {
    type : Array,
    defaultValue: [],
  }
}, {timestamps: true})

module.exports = mongoose.model('Session', sessionSchema)