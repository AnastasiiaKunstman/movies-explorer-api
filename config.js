const { PORT = 3000 } = process.env;
const { MONGODB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = { PORT, MONGODB_CONN, JWT_SECRET };
