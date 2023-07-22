const { ERROR_AUTH } = require('../utils/constans');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = ERROR_AUTH;
  }
}

module.exports = UnauthorizedError;
