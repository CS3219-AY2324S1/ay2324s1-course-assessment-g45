const Question = require('../models/questionModel');
const mongoose = require('mongoose');

// GET all questions
const getAllQuestions = async (req, res) => {
  const questions = await Question.find({}).sort({ createdAt: -1 });
  res.status(200).json(questions);
};

// GET a single question
const getSingleQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such question.' }); // Security best practice says to leave ambiguous error message like "Unauthorized"
  }

  const question = await Question.findById(id);

  if (!question) {
    return res.status(404).json({ error: 'No such question.' });
  }

  res.status(200).json(question);
};

// GET list of question by complexity
const getQuestionsByComplexity = async(req, res) => {
  const { complexity } = req.params

  const count = await Question.countDocuments({ complexity: complexity})
  var random = Math.floor(Math.random() * count)
  const question = await Question.findOne({ complexity: complexity}).skip(random)

  if (!question) {
    return res.status(400).json({error: `No questions found with ${complexity} complexity`})
  }

  res.status(200).json(question)
}

// POST a new question
const createQuestion = async (req, res) => {
  if (req.user.role === 'user') { 
    return res.status(403).json({ error: "Forbidden Request." })
  }

  const { title, categories, complexity, description } = req.body;
  try {
    const question = await Question.create({
      title,
      categories,
      complexity,
      description,
    });
    res.status(200).json(question);
  } catch (error) {
    if (error.code == 11000) {
      var errMsg = Object.keys(error.keyValue)[0] + ' already exists.';
    } else {
      var errMsg = error.message;
    }
    res.status(400).json({ error: errMsg });
  }
};

// DELETE a question
const deleteQuestion = async (req, res) => {
  if (req.user.role === 'user') { 
    return res.status(403).json({ error: "Forbidden Request." })
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such question.' });
  }

  const question = await Question.findOneAndDelete({ _id: id });

  if (!question) {
    return res.status(400).json({ error: 'No such question.' });
  }

  res.status(200).json(question);
};

// UPDATE a question
const updateQuestion = async (req, res) => {
  if (req.user.role === 'user') { 
    return res.status(403).json({ error: "Forbidden Request." })
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such question.' });
  }

  const question = await Question.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!question) {
    return res.status(400).json({ error: 'No such question.' });
  }

  const updatedQuestion = await Question.findById(id);

  res.status(200).json(updatedQuestion);
};

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  getQuestionsByComplexity,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
