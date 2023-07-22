const {
  PORT = 3001,
  MONGODB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'some-secret-key',
  NODE_ENV,
} = process.env;

const regExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/;

module.exports = {
  PORT,
  MONGODB_CONN,
  JWT_SECRET,
  NODE_ENV,
  regExp,
};
