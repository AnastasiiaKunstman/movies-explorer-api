const ERRORS = {
  AUTH_ERROR: 'Неправильные email или пароль',
  AUTH_REQUIRED: 'Необходима авторизация',
  ERROR_BAD_REQUEST: 'Переданы некорректные данные',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  ERROR_MOVIE_DELETE_FORBIDDEN: 'Недостаточно прав для удаления',
  USER_EMAIL_ERROR: 'Пользователь с таким email уже существует',
  USER_NOT_FOUND: 'Пользователь не найден',
  RATE_LIMIT_ERROR: 'Слишком много запросов с данного IP, повторите попытку позднее',
  INTERNAL_ERROR: 'На сервере произошла ошибка',
  ERROR_NOT_FOUND: 'Страница не найдена',
};

module.exports = ERRORS;
