const express = require('express')
const {
  getAllSessions,
  getSingleSession,
  createSession,
  updateSession,
} = require('../controllers/sessionController')

const router = express.Router()

// GET all sessions
router.get('/', getAllSessions)

// GET a single session
router.get('/:id', getSingleSession)

// POST new session
router.post('/', createSession)

// UPDATE session
router.patch('/:id', updateSession)

module.exports = router