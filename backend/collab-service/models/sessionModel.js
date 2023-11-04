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
  // uid1: {
  //   type: String, 
  //   required: true,
  // },
  // uid2 : {
  //   type: String,
  //   required: true,
  // },
  chat : {
    type : Array,
    defaultValue: [],
  }
}, {timestamps: true})

module.exports = mongoose.model('Session', sessionSchema)