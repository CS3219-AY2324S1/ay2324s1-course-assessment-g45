// const Question = require('../models/questionModel');
// const mongoose = require('mongoose');
const { OpenAI } = require("openai");
const { explainPrompt } = require("../data/prompt.json");


const openai = new OpenAI (process.env.OPENAI_API_KEY);

const generateResponse = async (req, res) => {
  const { message } = req.body;
  try {
    // const completion = await openai.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: `${explainPrompt}${message}` }],
    //   max_tokens: 200,
    //   temperature: 0,
    //   n: 1,
    // });
    // const response = completion.data.choices[0].message.content;

    // console.log(`${explainPrompt}${message}`)

    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${explainPrompt}${message}`,
      max_tokens: 150,
    });
    const response = completion.choices[0].text;

    return res.status(200).json({success: true,data: response});
  } catch (error) {
    // console.log(error);
    if (error.status == 401) {
      return res.status(401).json({
      error: "Please provide a valid API key.",
    });
    }
    return res.status(500).json({
      error: "An error occurred while generating recipe information. Please try again later.",
    });
  }
};
  
// POST a new question
// const createQuestion = async (req, res) => {
//   const { title, categories, complexity, description } = req.body;
//   try {
//     const question = await Question.create({
//       title,
//       categories,
//       complexity,
//       description,
//     });
//     res.status(200).json(question);
//   } catch (error) {
//     if (error.code == 11000) {
//       var errMsg = Object.keys(error.keyValue)[0] + ' already exists.';
//     } else {
//       var errMsg = error.message;
//     }
//     res.status(400).json({ error: errMsg });
//   }
// };

module.exports = {
  generateResponse,
  // createQuestion,
};
