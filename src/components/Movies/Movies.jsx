//   Movies — компонент страницы с поиском по фильмам  //
//  import { useEffect, useState } from 'react';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
//  import { SHORTIE } from '../../utils/constants';
import {getBeatFilms} from '../../utils/MoviesApi';


import './Movies.css';

/* const Movies = ({ movies, searchMovie, onSave,
  isMovieSaved, setSearchError, requestSearchError,
  loggedIn, isLoading }) => {

  const location = useLocation();
*/
const Movies = (onSave, isMovieSaved) => {


  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //  const [shortMovies, setShortMovies] = useState([]);  //
  //  const [searchMovie, setSearchMovie] = useState('');  //

  const searchMovie = () => {
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

  /*
  //  Создеаем список для показа по состоянию фильтра - короткометражки или все  //
  const listMovies = isShortie ?
    movies.filter((item) => item.duration <= SHORTIE) : movies;

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

  /*
  //  При монтировании проверяем, есть уже есть фильтр в лок.хран., получаем его значение  //
  useEffect(() => {
    if (localStorage.getItem('shortMovie')) {
      setIsShortie(JSON.parse(localStorage.getItem('shortMovie')));
    }
  }, [location]);

  //  При монтировании меняем ошибку поиска на '' или на "Ничего не найдено"  //
  useEffect(() => {
    setSearchError({
      hasApiError: false,
      apiErrorMessage: '',
    });
    listMovies.length === 0 &&
      setSearchError({
        hasApiError: true,
        apiErrorMessage: 'Ничего не найдено',
      });
  }, [isShortie, listMovies.length, setSearchError]);

  //  Обработчик переключателя фильтра "Короткометражки"  //
  //  Меняем состояние и значение в локальном хранилилще  //
  const handleShortFilter = () => {
    setIsShortie(!isShortie);
    localStorage.setItem('shortMovie', !isShortie);
  }
  */

  /*
        <Search
          searchMovie={searchMovie}
          {// isShortie={isShortie} // }
          {// onIsShortie={handleShortFilter} //}

        />

         <MoviesCardList
          onSave={onSave}
          isMovieSaved={isMovieSaved}
          movies = {movies}
        />

  */


  return (
    <>
      <main className='content'>
        <Search
          searchMovie={searchMovie}
        />
        <ErrorMessage />
        {/*isLoading && <Preloader />*/}

        <MoviesCardList
          onSave={onSave}
          isMovieSaved={isMovieSaved}
          movies = {movies}
          isLoading = {isLoading}
        />

      </main>
    </>
  );
}

export default Movies;
