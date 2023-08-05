const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');
const { AUTH_REQUIRED } = require('../utils/errorMessages');

const auth = (req, res, next) => {
  let token;

  try {
    token = req.cookies.jwt;
  } catch (err) {
    next(new UnauthorizedError(AUTH_REQUIRED));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(AUTH_REQUIRED));
  }
  req.user = payload;

  next();
};

module.exports = auth;
