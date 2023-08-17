const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_OK, ERROR_CODE_UNIQUE } = require('../utils/constans');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const ConflictError = require('../errors/Conflict');

const { USER_EMAIL_ERROR, ERROR_BAD_REQUEST, USER_NOT_FOUND } = require('../utils/errorMessages');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_OK).send({
      data: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new ConflictError(USER_EMAIL_ERROR));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_BAD_REQUEST));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 7 * 24,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
        .send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === ERROR_CODE_UNIQUE) {
        next(new ConflictError(USER_EMAIL_ERROR));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_BAD_REQUEST));
      } else next(err);
    });
};

module.exports = {
  createUser,
  login,
  logout,
  getProfile,
  updateProfile,
};
