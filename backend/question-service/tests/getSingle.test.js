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

describe('GET /api/questions/:id/', () => {
  it('can get a single question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_ADMIN_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const questionDetails = {
      title: 'Test get single question 1',
      categories: [],
      complexity: 'Hard',
      description: 'Test get single question description',
    };
    const question = await Question.create(questionDetails);
    const res = await request(app)
      .get(`/api/questions/${question._id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    await Question.findOneAndDelete({ _id: question._id });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(question.title);
  });

  it('cannot get question with non-existent id', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_USER_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const res = await request(app)
      .get(`/api/questions/blablabla`)
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    expect(res.statusCode).toBe(404);
  });
});
