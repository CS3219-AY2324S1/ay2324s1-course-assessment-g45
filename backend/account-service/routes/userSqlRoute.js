const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    login
} = require('../controllers/sqlUserController')

const router = express.Router()

// GET all profiles
router.get('/', getAllUsers)

// GET a single profile
router.get('/:id', getSingleUser)

// POST a new profile
router.post('/', createUser)

// DELETE a profile
router.delete('/:id', deleteUser)

// UPDATE a profile
router.patch('/:id', updateUser)

// LOGIN
router.post('/login', login)

module.exports = router
