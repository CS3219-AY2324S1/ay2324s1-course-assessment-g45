const User = require('../models/userModel')
const mongoose = require('mongoose')

// GET all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt : -1})

  res.status(200).json(users)
}

// GET a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)
  
  if (!user) {
    return res.status(404).json({error : 'No such user'})
  }

  res.status(200).json(user)
}

// POST a new user
const createUser = async (req, res) => {
  const {username, password, email} = req.body

  try {
    const user = await User.create({username, password, email})
    res.status(200).json(user)
  } catch (error) { 
    res.status(400).json({error: error.message})
  }
}

// DELETE a user
const deleteUser = async (req, res) => {
   const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }
  
  const user = await User.findOneAndDelete({_id: id})
  
  if (!user) {
    return res.status(400).json({error : 'No such user'})
  }

  res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }
  
  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  
  if (!user) {
    return res.status(400).json({error : 'No such user'})
  }

  const updatedUser = await User.findById(id)

  res.status(200).json(updatedUser)
}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
}