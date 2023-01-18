//  Компонент с коллекцией фильмов  //
//  Используем стейты для подсчета числа карточек и ширины экрана  //
//  По 3 на каждой строке на разрешении 1280 пикселей  //
//  Если сжимать окно браузера, карточки переносятся на следующую строку. //
//  Если карточек >3, под ними появляется кнопка «Ещё»   //
//  По нажатию отрисовываются ещё три, а кнопка сдвигается ниже под блок с карточками  //
//  Ширина 1280px — 12 карточек по 3 в ряд. «Ещё» загружает по 3 карточки.  //
//  Ширина 768px — 8 карточек по 2 в ряд. «Ещё» загружает по 2 карточки.  //
//  Ширина от 320px до 480px — 5 карточек по 1 в ряд. «Ещё» загружает по 2 карточки  //

import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import * as params from '../../utils/constants';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  onBookmark,
  onCheckBookmark,
  removeSavedMovies,
  movies,
}) => {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';

  const [moviesOnView, setMoviesOnView] = useState(0);
  const [screen, setScreen] = useState(window.innerWidth);

  const countCards = () => {
    if (screen >= params.LARGESCREEN) {
      setMoviesOnView(params.DEFAULTONLARGESCREEN);
    } else if (screen < params.LARGESCREEN && screen >= params.MIDDLESCREEN) {
      setMoviesOnView(params.DEFAULTONMIDDLESCREEN);
    } else if (screen <= params.MIDDLESCREEN) {
      setMoviesOnView(params.DEFAULTONSMALLSCREEN);
    }
  }

  useEffect(() => {
    countCards();
  }, []);

  window.onresize = function () {
    setTimeout(() => {
      countCards();
      setScreen(window.innerWidth);
    }, 1000);
  };

  const handleLoadMore = () => {
    if (screen >= params.LARGESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONLARGESCREEN);
    } else if (screen < params.LARGESCREEN && screen >= params.MIDDLESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONMIDDLESCREEN);
    } else if (screen <= params.MIDDLESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONSMALLSCREEN);
    }
  }

  return (
    <section className='movies'>
      <ul className='movies__elements'>
        {movies.slice(0, savedMoviesPage ? movies.length : moviesOnView).map((item) => (
          <MoviesCard
            key={item.id || item.movieId}
            card={item}
            onBookmark={onBookmark}
            onCheckBookmark={onCheckBookmark}
            removeSavedMovies={removeSavedMovies}
          />
        ))}
      </ul>

      {/* скрыть кнопку если карточек нет или мало */}
      {!savedMoviesPage && movies.length > moviesOnView && (
        <More onLoadMore={handleLoadMore} />
      )}
    </section>
  );
}

export default MoviesCardList;
