const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const { AUTH_ERROR } = require('../utils/errorMessages');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(AUTH_ERROR));
  }

  req.user = payload;

  next();
};

module.exports = auth;
