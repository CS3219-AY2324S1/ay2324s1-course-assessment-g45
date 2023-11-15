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

const defaultLanguage = {
  id: 63,
  name: "JavaScript (Node.js 12.14.0)",
  label: "JavaScript (Node.js 12.14.0)",
  value: "javascript",
  template: "console.log(\"Hello World!\");"
}

const languageSchema = new Schema({
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
  template: {
    type: String,
    defaultValue: 'class Main {\npublic static void main(String[] args) {\n\n}\n}'
  }
})

const sessionSchema = new Schema({
  data: {
    type: String,
    default: '',
  },
  language: {
    type: languageSchema,
    default: defaultLanguage
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
    default: [],
  }
}, {timestamps: true})

module.exports = mongoose.model('Session', sessionSchema)