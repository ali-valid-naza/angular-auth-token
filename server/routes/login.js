const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login')

router.route('/login').get((req, res) => {
  res.status(200).send('get login')
})

router.route('/login').post(login)

module.exports = router
