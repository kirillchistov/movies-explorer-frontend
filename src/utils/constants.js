//  const BASEURL = 'https://api.christoff.nomoredomains.club';
const BASEURL = 'http://localhost:3003';
const MOVIESURL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASEMOVIE = 'https://api.nomoreparties.co/'

//  Хроно для короткометражек <=40 мин.  //
const SHORTIE = 40;

const REGEXPS = {
  email: new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/i),
  name: new RegExp(/^[a-zа-яё\s]+$/i),
}

const ERRORS = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
};

//  Константы для экранов и пагинации - ленты фильмов  //
//  1280px — 12 фильмов, по 3 в ряд. «Ещё» + 3 фильма  //
//  768px — 8 фильмов по 2 в ряд. «Ещё» + 2 фильма  //
//  320px - 480px — 5 фильмов по 1 в ряд. «Ещё» + 2 фильма  //

const LARGESCREEN = 1280;
const MIDDLESCREEN = 768;
const SMALLSCREEN = 480;

const DEFAULTONLARGESCREEN = 12;
const DEFAULTONMIDDLESCREEN = 8;
const DEFAULTONSMALLSCREEN = 5;

const INCREASEONLARGESCREEN = 3;
const INCREASEONMIDDLESCREEN = 2;
const INCREASEONSMALLSCREEN = 2;

export {
  BASEURL,
  MOVIESURL,
  BASEMOVIE,
  SHORTIE,
  REGEXPS,
  ERRORS,
  LARGESCREEN,
  MIDDLESCREEN,
  SMALLSCREEN,
  DEFAULTONLARGESCREEN,
  DEFAULTONMIDDLESCREEN,
  DEFAULTONSMALLSCREEN,
  INCREASEONLARGESCREEN,
  INCREASEONMIDDLESCREEN,
  INCREASEONSMALLSCREEN,
};
