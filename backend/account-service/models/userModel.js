const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('UserProfile', userProfileSchema)