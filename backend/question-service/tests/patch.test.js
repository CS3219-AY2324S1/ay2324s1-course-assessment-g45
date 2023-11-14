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

describe('PATCH /api/questions/:id/', () => {
  it('admin can edit a question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_ADMIN_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const questionDetails = {
      title: 'Test edit question 1',
      categories: [],
      complexity: 'Hard',
      description: 'Test edit question description',
    };
    const question = await Question.create(questionDetails);
    const res = await request(app)
      .patch(`/api/questions/${question._id}`)
      .send({
        title: 'Test edit question 1 editted',
        categories: [],
        complexity: 'Easy',
        description: 'Test edit question description editted',
      })
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    await Question.findOneAndDelete({ _id: question._id });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test edit question 1 editted');
  });

  it('non-admin cannot edit a question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_USER_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const questionDetails = {
      title: 'Test edit question 2',
      categories: [],
      complexity: 'Hard',
      description: 'Test edit question description',
    };
    const question = await Question.create(questionDetails);
    const res = await request(app)
      .patch(`/api/questions/${question._id}`)
      .send({
        title: 'Test edit question 2 editted',
        categories: [],
        complexity: 'Easy',
        description: 'Test edit question description editted',
      })
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    const testFindQuestion = await Question.findById(question._id);
    await Question.findOneAndDelete({ _id: question._id });
    expect(res.statusCode).toBe(403);
    expect(testFindQuestion.title).toBe(question.title);
  });
});
