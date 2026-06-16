const Movie = require('../models/movie');
const ForbiddenError = require('../utils/errors/forbidden-error');
const NoDataError = require('../utils/errors/no-data-error');
const IncorrectDataError = require('../utils/errors/incorrect-data-error');

//  Получаем все карточки   //
module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

//  Создаем карточку фильма   //
module.exports.createMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    //  const { name, link } = req.body;  //
    const movie = await Movie.create({ ...req.body, owner: ownerId });
    res.status(201).send(movie);
  } catch (err) {
    next(err);
  }
};

//  Удаляем карточку фильма с проверкой свой/чужой   //
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NoDataError(`Фильм с id ${req.params.movieId} не найден`);
      } else if (movie.owner.toHexString() !== req.user._id) {
        throw new ForbiddenError('Фильм другого пользователя удалить нельзя');
      }
      return movie.delete()
        .then(() => {
          res.status(200).send(movie);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError(`Переданы некорректные данные для удаления карточки с id ${req.params.movieId}`));
      } else {
        next(err);
      }
    });
};

//  Додебажим вариант с aysnc await чуть позже  //
/*
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NoDataError(`Фильм с id ${req.params.movieId} не найден`);
    } else if (movie.owner.toHexString() !== req.user._id) {
      throw new ForbiddenError('Фильм другого пользователя удалить нельзя');
    }
    await Movie.findByIdAndRemove(req.params.movieId);
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};
*/

export {};
