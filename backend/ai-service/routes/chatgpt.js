const express = require('express');
const {
  generateResponse
} = require('../controllers/chatgptController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all question routes
// router.use(requireAuth);

// POST a new request
router.post('/', generateResponse);


module.exports = router;
