const router = require('express').Router();
const userRouters = require('./users');
const movieRouters = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { ERROR_NOT_FOUND } = require('../utils/errorMessages');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouters);
router.use('/movies', movieRouters);
router.use('/signout', logout);

router.use('/*', (req, res, next) => next(new NotFoundError(ERROR_NOT_FOUND)));

module.exports = router;
