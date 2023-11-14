const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeAll(() => {
  mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterAll(() => {
  mongoose.connection.close();
});

describe('GET /api/questions/', () => {
  it('can get all single questions', async () => {
    const token = jwt.sign(
      { _id: process.env.TEST_ADMIN_ID },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const res = await request(app)
      .get(`/api/questions/`)
      .set('Authorization', `abc ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);
  });
});
