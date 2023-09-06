const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// GET all profiles
router.get('/', getAllUsers)

// GET a single profiles
router.get('/:id', getSingleUser)

// POST a new profiles
router.post('/', createUser)

// DELETE a profiles
router.delete('/:id', deleteUser)

// UPDATE a profiles
router.patch('/:id', updateUser)

module.exports = router