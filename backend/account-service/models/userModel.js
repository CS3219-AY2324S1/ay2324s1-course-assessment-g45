const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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

userProfileSchema.statics.signUp = async function(username, password, email) {
    
    // const exists = await this.findOne({
    //     $or: [
    //         { username: username },
    //         { email: email }
    //     ]
    // });

    // if (exists) {
    //     if (exists.username === username) {
    //         throw Error('Username already in use');
    //     }
    //     if (exists.email === email) {
    //         throw Error('Email already in use');
    //     }
    // }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, email})

    return user

}

module.exports = mongoose.model('UserProfile', userProfileSchema)