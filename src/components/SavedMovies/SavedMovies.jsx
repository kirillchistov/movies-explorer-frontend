//  Компонент с галереей сохраненных фильмов  //
//  Применяем фильтр по короткометражкам isShortie //

import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Footer from '../Footer/Footer';
//  import saved from '../../utils/saved';  //
import { SHORTIE } from '../../utils/constants';
import './SavedMovies.css';

const SavedMovies = ({
  loggedIn, movies, deleteSaved, searchMovie,
  apiSearchError, setApiSearchError }) => {

  //  Состояние для фильтра короткометражек  //
  const [isShortie, setIsShortie] = useState(false);

  //  Список для показа по состоянию фильтра - короткометражки или все  //
  const displayMovies = isShortie ?
    movies.filter((item) => item.duration <= SHORTIE) : movies;

  //  При монтировании убираем или показываем сообщение об ошибке поиска   //
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
          <MoviesCardList movies={displayMovies} deleteSaved={deleteSaved} />
        </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
