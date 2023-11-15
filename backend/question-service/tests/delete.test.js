const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const Question = require('../models/questionModel');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeAll(() => {
  mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterAll(() => {
  mongoose.connection.close();
});

describe('DELETE /api/questions/:id/', () => {
  it('admin can delete a question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_ADMIN_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const questionDetails = {
      title: 'Test delete question 1',
      categories: [],
      complexity: 'Hard',
      description: 'Test delete question description',
    };
    const question = await Question.create(questionDetails);
    const res = await request(app)
      .delete(`/api/questions/${question._id}`)
      .set('Authorization', `abc ${token}`);
    const testFindQuestion = await Question.findById(question._id);
    expect(res.statusCode).toBe(200);
    expect(testFindQuestion).toBe(null);
  });

  it('non-admin cannot delete a question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_USER_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const questionDetails = {
      title: 'Test delete question 2',
      categories: [],
      complexity: 'Hard',
      description: 'Test delete question description',
    };
    const question = await Question.create(questionDetails);
    const res = await request(app)
      .delete(`/api/questions/${question._id}`)
      .set('Authorization', `abc ${token}`);
    const testFindQuestion = await Question.findById(question._id);
    await Question.findOneAndDelete({ _id: question._id });
    expect(res.statusCode).toBe(403);
    expect(testFindQuestion.title).toBe(questionDetails.title);
  });
});
