const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// GET all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt : -1})

  res.status(200).json(users)
}

// GET a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user.'})
  }

  const user = await User.findById(id)
  
  if (!user) {
    return res.status(404).json({error : 'No such user.'})
  }

  res.status(200).json(user)
}

// POST a new user
const createUser = async (req, res) => {
  const {username, password, email} = req.body

  try {
    const defaultUserRole = "user"
    const user = await User.signUp(username, password, email, defaultUserRole)

    // create token
    const token = createToken(user._id)

   // res.status(200).json(user)
    res.status(200).json({username, email, token})

  } catch (error) {
    if (error.code == 11000) {
      var errMsg = Object.keys(error.keyValue)[0] + " already exists."
    } else {
      var errMsg = error.message
    }
    res.status(400).json({error: errMsg})
  }
}
 
// DELETE a user
const deleteUser = async (req, res) => {
   const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user.'})
  }
  
  const user = await User.findOneAndDelete({_id: id})
  
  if (!user) {
    return res.status(400).json({error : 'No such user.'})
  }

  res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such user.'})
    }
    
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
    
    if (!user) {
      return res.status(400).json({error : 'No such user.'})
    }

    const updatedUser = await User.findById(id)
    res.status(200).json(updatedUser)
    
  } catch (error) {
    if (error.code == 11000) {
      var errMsg = Object.keys(error.keyValue)[0] + " already exists."
    } else {
      var errMsg = error.message
    }
    res.status(400).json({error: errMsg})
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.loginUser(username, password)

    // create token
    const token = createToken(user._id)
    res.status(200).json({id: user._id, username, token, role: user.role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    login
}