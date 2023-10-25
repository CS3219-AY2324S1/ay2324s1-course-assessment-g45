const mongoose = require("mongoose")

const Schema = mongoose.Schema

const sessionSchema = new Schema({
  data: {
    type: String,
    defaultValue: '',
  },
  questionId: {
    type: String,
    required: true,
  },
  uid1: {
    type: String, 
    required: true,
  },
  uid2 : {
    type: String,
    required: true,
  },
  chat : {
    type : Array,
    defaultValue: [],
  }
}, {timestamps: true})

module.exports = mongoose.model('Session', sessionSchema)