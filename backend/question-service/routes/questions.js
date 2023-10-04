const express = require('express');
const {
  getAllQuestions,
  getSingleQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all question routes
router.use(requireAuth);

// GET all questions
router.get('/', getAllQuestions);

// GET a single question
router.get('/:id', getSingleQuestion);

// POST a new question
router.post('/', createQuestion);

// DELETE a question
router.delete('/:id', deleteQuestion);

// UPDATE a question
router.patch('/:id', updateQuestion);

module.exports = router;
