const jwt = require('jsonwebtoken');
const { JWT_DEV_KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/Unauthorized');
const { AUTH_REQUIRED } = require('../utils/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith) {
    throw new UnauthorizedError(AUTH_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_KEY);
  } catch (err) {
    throw new UnauthorizedError(AUTH_REQUIRED);
  }

  req.user = payload;

  next();
};

module.exports = auth;
