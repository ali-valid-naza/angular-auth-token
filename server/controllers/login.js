const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors/bad-request');

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide login and password');
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_LIFETIME || '30d'});

  res.status(200).json({
    token: token,
    username: username
  });
};

module.exports = {
  login,
}
