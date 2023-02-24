//   Movies — компонент страницы с поиском по фильмам  //
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { SHORTIE } from '../../utils/constants';
//  import {getBeatFilms} from '../../utils/MoviesApi';


import './Movies.css';

const Movies = ({ movies, searchMovie, onSave,
  isMovieSaved, setApiError, apiSearchError,
  loggedIn, isLoading }) => {

  const location = useLocation();
  const [isShortie, setIsShortie] = useState(false);

  // const [movies, setMovies] = useState([]);  //
  // const [isLoading, setIsLoading] = useState(false);  //
  //  const [shortMovies, setShortMovies] = useState([]);  //
  //  const [searchMovie, setSearchMovie] = useState('');  //

  /*
  const getMovies = () => {
    setIsLoading(true);
    getBeatFilms()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log('успех');
      });
  }
  */

  //  Создеаем список для показа по состоянию фильтра - короткометражки или все  //
  const listMovies = isShortie ?
    movies.filter((item) => item.duration <= SHORTIE) : movies;

  //  При монтировании смотрим, есть ли фильтр в лок.хран., получаем JSON  //
  useEffect(() => {
    if (localStorage.getItem('shortMovie')) {
      setIsShortie(JSON.parse(localStorage.getItem('shortMovie')));
    }
  }, [location]);


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
    setApiError({
      isApiError: false,
      apiErrorMessage: '',
    });
    listMovies.length === 0 &&
      setApiError({
        isApiError: true,
        apiErrorMessage: 'Ничего не найдено',
      });
  }, [isShortie, listMovies.length, setApiError]);

  //  Обработчик переключателя фильтра "Короткометражки"  //
  //  Меняем состояние и значение в локальном хранилилще  //
  const handleShortFilter = () => {
    setIsShortie(!isShortie);
    localStorage.setItem('shortMovie', !isShortie);
  }

  //  Поиск с фильтром + блок с ошибкой поиска, результаты поиска с фильтром  //
  return (
    <>
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
            movies={listMovies}
          />
        )}
      </main>
    </>
  );
}

export default Movies;
