const { ERROR_CONFLICT } = require('../utils/constans');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
