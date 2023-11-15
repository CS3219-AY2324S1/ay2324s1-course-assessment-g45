const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const Question = require('../models/questionModel');

require('dotenv').config();
// Test comment
/* Connecting to the database before each test. */
beforeAll(() => {
  mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterAll(() => {
  mongoose.connection.close();
});

describe('POST /api/questions/', () => {
  it('admin can create a new question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_ADMIN_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const res = await request(app)
      .post('/api/questions/')
      .send({
        title: 'Test post question',
        categories: [],
        complexity: 'Hard',
        description: 'Test post question description',
      })
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    await Question.findOneAndDelete({ _id: res.body._id });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test post question');
  });

  it('non-admin cannot post a question', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_USER_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const res = await request(app)
      .post('/api/questions/')
      .send({
        title: 'Test post question 2',
        categories: [],
        complexity: 'Hard',
        description: 'Test post question description',
      })
      .set('Content-type', 'application/json')
      .set('Authorization', `abc ${token}`);
    await Question.findOneAndDelete({ _id: res.body._id });
    expect(res.statusCode).toBe(403);
  });
});
