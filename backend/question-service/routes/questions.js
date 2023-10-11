const express = require('express');
const {
  getAllQuestions,
  getSingleQuestion,
  getQuestionsByComplexity,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../controllers/questionController');

const router = express.Router();

// GET all questions
router.get('/', getAllQuestions);

// GET a single question
router.get('/:id', getSingleQuestion);

// GET all questions of given complexity
router.get('/complexity/:complexity', getQuestionsByComplexity)

// POST a new question
router.post('/', createQuestion);

// DELETE a question
router.delete('/:id', deleteQuestion);

// UPDATE a question
router.patch('/:id', updateQuestion);

module.exports = router;
