//  Валидатор карточек фильмов  //
const Joi = require('joi');
//  const regex = require('../utils/regex');  //
const isURL = require('validator/lib/isURL');
const { urlValidatorMessage } = require('../utils/constants');
const validate = require('./validation');

const validateMovie = validate(
  Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image:
      Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    trailerLink:
      Joi.string()
        .required()
        // .pattern(urlRegEx),
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    thumbnail:
      Joi.string()
        .required()
        // .pattern(urlRegEx),
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(urlValidatorMessage);
        }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
);

const validateMovieId = validate(
  Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
  'params',
);

module.exports = {
  validateMovie,
  validateMovieId,
};

export {};
