const { ERROR_BADREQUEST } = require('../utils/constans');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = ERROR_BADREQUEST;
  }
}

module.exports = BadRequestError;
