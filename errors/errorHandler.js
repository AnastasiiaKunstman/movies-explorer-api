const { ERROR_DEFAULT } = require('../utils/constans');
const { INTERNAL_ERROR } = require('../utils/errorMessages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_DEFAULT ? INTERNAL_ERROR : message,
  });
  next();
};

module.exports = errorHandler;
