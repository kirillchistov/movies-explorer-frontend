//   Movies — компонент страницы с поиском по фильмам  //
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { SHORTIE } from '../../utils/constants';
//  import {getBeatFilms} from '../../utils/MoviesApi';

import './Movies.css';

const Movies = ({ loggedIn, isLoading, movies, searchMovie, onSave,
  isMovieSaved, setApiSearchError, apiSearchError }) => {

  const location = useLocation();
  const [isShortie, setIsShortie] = useState(false);

  //  Подняли стейты в App  //
  //  Получаем список фильмов через пропсы  //
  /*
  const getMovies = () => {
    setIsLoading(true);
    getBeatFilms()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(`Ошибка получения фильмов: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        console.log('загрузка данных завершена');
      });
  }
  */

  //  Создаем список для показа по состоянию фильтра - короткометражки или все  //
  const displayMovies = isShortie ?
    movies.filter((item) => item.duration <= SHORTIE) : movies;

  //  При монтировании смотрим, есть ли фильтр в лок.хран., получаем JSON  //
  useEffect(() => {
    if (localStorage.getItem('shortMovie')) {
      setIsShortie(JSON.parse(localStorage.getItem('shortMovie')));
    }
  }, [location]);


  //  Вынесли функцию поиска по фильмам searchMovie в App  //
  /*
  useEffect(() => {
    if (searchMovie) {
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const filterItems = (arr, query) =>
        arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      const foundMovies = filterItems(allMovies, searchMovie);
      setMovies([...foundMovies]);
      const foundShortMovies = foundMovies.filter((movie) => movie.duration <= 40);
      setShortMovies([...foundShortMovies]);
    }
  },[searchMovie])
  */

  //  При монтировании меняем ошибку поиска на '' или "Ничего не найдено"  //
  useEffect(() => {
    setApiSearchError({
      isApiError: false,
      apiErrorMessage: '',
    });
    displayMovies.length === 0 &&
      setApiSearchError({
        isApiError: true,
        apiErrorMessage: 'Ничего не найдено',
      });
  }, [isShortie, displayMovies.length, setApiSearchError]);

  //  Обработчик переключателя фильтра "Короткометражки"  //
  //  Меняем состояние и значение в локальном хранилилще  //
  const handleShortFilter = () => {
    setIsShortie(!isShortie);
    localStorage.setItem('shortMovie', !isShortie);
  }

  //  Шапка, Поиск с фильтром, Блок с ошибкой, Результаты поиска, Подвал  //
  //  На рефакторе можно объединить с "Сохраненными" через HOC //
  return (
    <>
      <Header loggedIn={loggedIn} />
        <main className='content'>
          <Search
            onIsShortie={handleShortFilter}
            isShortie={isShortie}
            searchMovie={searchMovie}
          />

          <ErrorMessage apiSearchError={apiSearchError} />

          {isLoading && <Preloader />}

          {!isLoading && (
            <MoviesCardList
              onSave={onSave}
              isMovieSaved={isMovieSaved}
              movies={displayMovies}
            />
          )}
        </main>
      <Footer />
    </>
  );
}

export default Movies;
