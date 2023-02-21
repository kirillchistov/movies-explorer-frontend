//  Компонент со списокм фильмов - един для "Фильмы" и "Сохраненные"  //
//  Используем стейты для подсчета числа карточек и ширины экрана  //
//  По 3 на каждой строке на разрешении 1280 пикселей  //
//  Если сжимать окно браузера, карточки переносятся на следующую строку. //
//  Если карточек >3, под ними появляется кнопка «Ещё»   //
//  По нажатию отрисовываются ещё три, а кнопка сдвигается ниже под блок с карточками  //
//  Ширина 1280px — 12 карточек по 3 в ряд. «Ещё» загружает по 3 карточки.  //
//  Ширина 768px — 8 карточек по 2 в ряд. «Ещё» загружает по 2 карточки.  //
//  Ширина от 320px до 480px — 5 карточек по 1 в ряд. «Ещё» загружает по 2 карточки  //

import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import {
        LARGESCREEN, DEFAULTONLARGESCREEN, INCREASEONLARGESCREEN,
          MIDDLESCREEN, DEFAULTONMIDDLESCREEN, INCREASEONMIDDLESCREEN,
            DEFAULTONSMALLSCREEN, INCREASEONSMALLSCREEN } from '../../utils/constants';
import './MoviesCardList.css';
//  import movies from '../../utils/moviesdb';  //

export const MoviesCardList = ({
  onBookmark,
  checkBookmark,
  deleteBookmark,
  movies,
  }) => {
  const location = useLocation();

  //  состояния для вывода карточек в зависимости от размера экрана  //
  const [moviesToShow, setMoviesToShow] = useState(0);
  const [screen, setScreen] = useState(window.innerWidth);

  //  проверяем путь - куда какой список выводим  //
  const savedMoviesPath = location.pathname === '/saved-movies';

  //  для /movies в зависимости от разрешения выводим карт выводим нужное число карточек  //
  const countCards = () => {
    if (screen >= LARGESCREEN) {
      setMoviesToShow(DEFAULTONLARGESCREEN);
    } else if (screen < LARGESCREEN && screen >= MIDDLESCREEN) {
      setMoviesToShow(DEFAULTONMIDDLESCREEN);
    } else if (screen <= MIDDLESCREEN) {
      setMoviesToShow(DEFAULTONSMALLSCREEN);
    }
  }

  //  При изменении размера окна через сек снова запускаем расчет  //
  //  Надо бы делать по условию, что !savedMoviesPath  //
  window.onresize = function () {
    setTimeout(() => {
      countCards();
      setScreen(window.innerWidth);
    }, 1000);
  };

  //  Хук для работы с отрисовкой карточек в компоненте  //
  //  Вот что тут должно быть в зависимостях, чтобы не зацикливать?  //
  useEffect(() => {
    countCards();
  }, []);

  //  Обрабатываем клик по кнопке "Еще"  //
  //  В зависимости от размера и зума добавляем карточки на страницу  //

  const handleClickMore = () => {
    if (screen >= LARGESCREEN) {
      setMoviesToShow(moviesToShow + INCREASEONLARGESCREEN);
    } else if (screen < LARGESCREEN && screen >= MIDDLESCREEN) {
      setMoviesToShow(moviesToShow + INCREASEONMIDDLESCREEN);
    } else if (screen <= MIDDLESCREEN) {
      setMoviesToShow(moviesToShow + INCREASEONSMALLSCREEN);
    }
  }

  //  В сохраненных выбираем все фильмы, на основной - первые X по калькулятору moviesToShow //
  //  Под списком на главной "Фильмы" выводим кнопку "Еще", если карточек больше moviesToShow  //
  return (
    <section className='movies'>
      <ul className='movies__elements'>
        {movies.slice(0, savedMoviesPath ? movies.length : moviesToShow).map((item) => (
          <MoviesCard
            key={item.id || item.movieId}
            card={item}
            onBookmark={onBookmark}
            checkBookmark={checkBookmark}
            deleteBookmark={deleteBookmark}
          />
        ))}
      </ul>
      {!savedMoviesPath && movies.length > moviesToShow && (
        <More onLoadMore={handleClickMore} />
      )}
    </section>
  )
  };
