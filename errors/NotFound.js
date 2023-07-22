const { ERROR_NOTFOUND } = require('../utils/constans');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_NOTFOUND;
  }
}

module.exports = NotFoundError;
