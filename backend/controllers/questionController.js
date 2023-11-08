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

// POST a new question
const createQuestion = async (req, res) => {
  const { title, categories, complexity, description } = req.body;

  const checkQuestion = await Question.findOne({ title: title }).exec();
  if (checkQuestion) {
    return res.status(404).json({ error: 'Duplicate question.' });
  }

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
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: 'No such question.' });
  // }

  const question = await Question.findOneAndDelete({ title: id });

  if (!question) {
    return res.status(400).json({ error: 'No such question.' });
  }

  res.status(200).json(question);
};

// UPDATE a question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: 'No such question.' });
  // }

  if (id !== req.body.title) {
    const checkQuestion = await Question.findOne({
      title: req.body.title,
    }).exec();
    if (checkQuestion)
      return res.status(400).json({ error: 'Question title already exists.' });
  }

  const question = await Question.findOneAndUpdate(
    { title: id },
    {
      ...req.body,
    }
  );

  if (!question) {
    return res.status(400).json({ error: 'No such question.' });
  }

  const updatedQuestion = await Question.findOne({ title: id }).exec();

  res.status(200).json(updatedQuestion);
};

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
