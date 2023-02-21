//  Компонент с коллекцией фильмов  //
//  Используем стейты для подсчета числа карточек и ширины экрана  //
//  По 3 на каждой строке на разрешении 1280 пикселей  //
//  Если сжимать окно браузера, карточки переносятся на следующую строку. //
//  Если карточек >3, под ними появляется кнопка «Ещё»   //
//  По нажатию отрисовываются ещё три, а кнопка сдвигается ниже под блок с карточками  //
//  Ширина 1280px — 12 карточек по 3 в ряд. «Ещё» загружает по 3 карточки.  //
//  Ширина 768px — 8 карточек по 2 в ряд. «Ещё» загружает по 2 карточки.  //
//  Ширина от 320px до 480px — 5 карточек по 1 в ряд. «Ещё» загружает по 2 карточки  //

import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
//  import movies from '../../utils/moviesdb';  //

const MoviesCardList = ({movies}) => {
//   const movielist = movies;  //
  return (
    <section className='movies'>
      <ul className='movies__elements'>
        {movies.map((item) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </ul>

      <More />
    </section>
  );
}

export default MoviesCardList;
