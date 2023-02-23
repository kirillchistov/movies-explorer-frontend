//   Movies — компонент страницы с поиском по фильмам  //
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { SHORTIE } from '../../utils/constants';


const Movies = ({ movies, searchMovie, onBookmark,
  checkBookmark, setRequestSearchError, requestSearchError,
  loggedIn, isLoading }) => {

  const location = useLocation();
  const [isShortie, setIsShortie] = useState(false);

  //  const [movies, setMovies] = useState([]);  //
  //  const [shortMovies, setShortMovies] = useState([]);  //
  //  const [searchMovie, setSearchMovie] = useState('');  //

  //  Создеаем список для показа по состоянию фильтра - короткометражки или все  //
  const listMovies = isShortie ?
    movies.filter((item) => item.duration <= SHORTIE) : movies;

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

  //  При монтировании проверяем, есть уже есть фильтр в лок.хран., получаем его значение  //
  useEffect(() => {
    if (localStorage.getItem('shortMovie')) {
      setIsShortie(JSON.parse(localStorage.getItem('shortMovie')));
    }
  }, [location]);

  //  При монтировании меняем ошибку поиска на '' или на "Ничего не найдено"  //
  useEffect(() => {
    setRequestSearchError({
      isRequestError: false,
      messageRequestError: '',
    });
    listMovies.length === 0 &&
      setRequestSearchError({
        isRequestError: true,
        messageRequestError: 'Ничего не найдено',
      });
  }, [isShortie, listMovies.length, setRequestSearchError]);

  //  Обработчик переключателя фильтра "Короткометражки"  //
  //  Меняем состояние и значение в локальном хранилилще  //
  const handleShortFilter = () => {
    setIsShortie(!isShortie);
    localStorage.setItem('shortMovie', !isShortie);
  }

  return (
    <>
      <main className='content'>
        <Search
          searchMovie={searchMovie}
          isShortie={isShortie}
          onIsShortie={handleShortFilter}

        />
        <ErrorMessage />
        {isLoading && <Preloader />}

        <MoviesCardList
          onBookmark={onBookmark}
          checkBookmark={checkBookmark}
          movies = {listMovies}
        />

      </main>
    </>
  );
}

export default Movies;
