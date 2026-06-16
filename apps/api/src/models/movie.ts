/* Поля схемы movie:
country — страна создания фильма. Обязательное поле-строка.
director — режиссёр фильма. Обязательное поле-строка.
duration — длительность фильма. Обязательное поле-число.
year — год выпуска фильма. Обязательное поле-строка.
description — описание фильма. Обязательное поле-строка.
image — ссылка на постер к фильму. Обязательное поле-строка (URL-адрес).
trailerLink — ссылка на трейлер фильма. Обязательное поле-строка (URL-адрес).
thumbnail — мини изображение постера к фильму. Обязательное поле-строка (URL-адрес).
owner — _id пользователя, который сохранил фильм. Обязательное поле.
movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
nameRU — название фильма на русском языке. Обязательное поле-строка.
nameEN — название фильма на английском языке. Обязательное поле-строка.
*/
//  Создаем подключение к mongoose, валидацию  //

const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL'); // использование стандартной библиотеки валидации
const { urlValidatorMessage, requiredValidationMessage } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, requiredValidationMessage('country')],
    },
    director: {
      type: String,
      required: [true, requiredValidationMessage('director')],
    },
    duration: {
      type: Number,
      required: [true, requiredValidationMessage('duration')],
    },
    year: {
      type: String,
      required: [true, requiredValidationMessage('year')],
    },
    description: {
      type: String,
      required: [true, requiredValidationMessage('description')],
    },
    image: {
      type: String,
      required: [true, requiredValidationMessage('image')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    trailerLink: {
      type: String,
      required: [true, requiredValidationMessage('trailerLink')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    thumbnail: {
      type: String,
      required: [true, requiredValidationMessage('thumbnail')],
      validate: {
        validator: (v) => isURL(v),
        message: urlValidatorMessage,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, requiredValidationMessage('owner')],
    },
    movieId: {
      type: Number,
      required: [true, requiredValidationMessage('movieId')],
    },
    nameRU: {
      type: String,
      required: [true, requiredValidationMessage('nameRU')],
    },
    nameEN: {
      type: String,
      required: [true, requiredValidationMessage('nameEN')],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);

export {};
