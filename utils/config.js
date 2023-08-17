const { PORT = 3000 } = process.env;
const { MONGODB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const corsOptions = {
  origin: [
    'http://diplom.akunstman.nomoredomains.xyz',
    'https://diplom.akunstman.nomoredomains.xyz',
    'http://api.diplom.akunstman.nomoredomains.xyz',
    'https://api.diplom.akunstman.nomoredomains.xyz',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  credentials: true,
};

const regExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/;

module.exports = {
  PORT,
  MONGODB_ADRESS,
  corsOptions,
  regExp,
};
