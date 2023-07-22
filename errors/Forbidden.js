const { ERROR_ACCESS } = require('../utils/constans');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = ERROR_ACCESS;
  }
}

module.exports = ForbiddenError;
