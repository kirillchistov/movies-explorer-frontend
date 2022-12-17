//  const BASEURL = 'https://api.christoff.nomoredomains.club/';
const BASEURL = 'http://localhost:3003';
const MOVIESURL = 'https://api.nomoreparties.co/beatfilm-movies';

//  Хроно для короткометражек <=40 мин.  //
const SHORTFILM = 40;

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
  SHORTFILM,
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
