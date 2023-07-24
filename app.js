require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const limiter = require('./utils/rateLimit');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGODB_CONN } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_CONN);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);

app.use(limiter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
