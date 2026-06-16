//  Роуты для фильмов (3) Get /movies, Post /movies и Delete /movies/_id  //
//  Удалить лишние роуты, если понятно будет, что они не нужны на след. этапах  //
const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
//  likeMovie,  //
//  dislikeMovie,  //
} = require('../controllers/movies');

const { validateMovie, validateMovieId } = require('../middlewares/validate-movie');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);
//  router.put('/:movieId/likes', validateMovieId, likeMovie);  //
//  router.delete('/:movieId/likes', validateMovieId, dislikeMovie);  //

module.exports = router;

export {};
