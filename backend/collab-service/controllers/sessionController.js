const Session = require('../models/sessionModel')
const mongoose = require('mongoose')

// GET all sessions
const getAllSessions = async (req, res) => {
  const sessions = await Session.find({}).sort({createdAt: -1})
  res.status(200).json(sessions)
}

// GET session
const getSingleSession = async (req, res) => {
  const { id } = req.params
  try {
    const session = await Session.findById(id)
    res.status(200).json(session)
  } catch (error) {
    return res.status(404).json({error: "No session found"})
  }
}


// POST a session
const createSession = async (req, res) => {
  console.log(req.body)
  const { questionId, uid1, uid2 } = req.body

  try {
    const session = await Session.create(req.body)
    console.log(session)
    res.status(200).json(session)
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

module.exports = {
  getAllSessions,
  getSingleSession,
  createSession,
}