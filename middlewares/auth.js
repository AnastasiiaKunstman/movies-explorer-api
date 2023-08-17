const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
<<<<<<< HEAD

=======
>>>>>>> 1b999919e07aa0f55cc9592ae577db49d9f403a0
  if (!authorization) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  const token = authorization.replace('Bearer ', '');
<<<<<<< HEAD

=======
>>>>>>> 1b999919e07aa0f55cc9592ae577db49d9f403a0
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
