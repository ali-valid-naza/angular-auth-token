const express = require('express');
const router = express.Router();
const { incrementCount } = require('../controllers/counter');

router
  .route('/counter')
  .post(incrementCount);

module.exports = router;
