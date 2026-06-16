const BASEURL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV ? '/api' : '');
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';
const MOVIESURL = import.meta.env.VITE_MOVIES_API_URL || 'https://api.nomoreparties.co/beatfilm-movies';
const BASEMOVIE = 'https://api.nomoreparties.co/';

//  Хроно для короткометражек <=40 мин.  //
const SHORTIE = 40;
const MOVIES_NAME = 'moviesSearch';

const REGEXPS = {
  email: new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/i),
  name: new RegExp(/^[a-zа-яё\s]+$/i),
};

const ERRORS = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
};

//  Константы для экранов и пагинации - ленты фильмов  //
//  1280px — 12 фильмов, по 3 в ряд. «Ещё» + 3 фильма  //

const LARGESCREEN = 1280;
const DEFAULTONLARGESCREEN = 12;
const INCREASEONLARGESCREEN = 3;

//  768px — 8 фильмов по 2 в ряд. «Ещё» + 2 фильма  //
const MIDDLESCREEN = 768;
const DEFAULTONMIDDLESCREEN = 8;
const INCREASEONMIDDLESCREEN = 2;

//  320px - 480px — 5 фильмов по 1 в ряд. «Ещё» + 2 фильма  //
const SMALLSCREEN = 480;
const DEFAULTONSMALLSCREEN = 5;
const INCREASEONSMALLSCREEN = 2;

export {
  BASEURL,
  USE_MOCK_API,
  MOVIESURL,
  BASEMOVIE,
  SHORTIE,
  MOVIES_NAME,
  REGEXPS,
  ERRORS,
  LARGESCREEN,
  MIDDLESCREEN,
  SMALLSCREEN,
  DEFAULTONLARGESCREEN,
  INCREASEONLARGESCREEN,
  DEFAULTONMIDDLESCREEN,
  INCREASEONMIDDLESCREEN,
  DEFAULTONSMALLSCREEN,
  INCREASEONSMALLSCREEN,
};
