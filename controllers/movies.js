const Movie = require('../models/movies');
const { STATUS_OK } = require('../utils/constans');
const ForbiddenError = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');

const { ERROR_BAD_REQUEST, MOVIE_NOT_FOUND, ERROR_MOVIE_DELETE_FORBIDDEN } = require('../utils/errorMessages');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ owner: _id, ...req.body })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError(MOVIE_NOT_FOUND))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(ERROR_MOVIE_DELETE_FORBIDDEN));
      }
      return Movie.deleteOne(movie)
        .then(() => res.status(STATUS_OK).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(ERROR_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
