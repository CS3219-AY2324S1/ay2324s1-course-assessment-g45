const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    login
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

// GET all profiles
router.get('/', requireAuth, getAllUsers)

// GET a single profile
router.get('/:id', requireAuth, getSingleUser)

// POST a new profile
router.post('/', createUser)

// DELETE a profile
router.delete('/:id', requireAuth, deleteUser)

// UPDATE a profile
router.patch('/:id', requireAuth, updateUser)

// LOGIN
router.post('/login', login)


module.exports = router