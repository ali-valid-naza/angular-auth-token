const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/unauth');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  try {
    const payload = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
