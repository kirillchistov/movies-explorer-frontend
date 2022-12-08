//   Movies — компонент страницы с поиском по фильмам  //
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import { SHORTFILM } from '../../utils/constants';

const Movies = ({
  onBookmark,
  onCheckBookmark,
  setRequestSearchError,
  requestSearchError,
  searchMovie,
  movies,
  loggedIn,
  isLoading,
}) => {
  const location = useLocation();
  const [isShort, setIsShort] = useState(false);
  
  const handleIsShort = () => {
    setIsShort(!isShort);
    localStorage.setItem('shortMovie', !isShort);
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovie')) {
      setIsShort(JSON.parse(localStorage.getItem('shortMovie')));
    }
  }, [location]);

  const listMovies = isShort
    ? movies.filter((item) => item.duration <= SHORTFILM)
    : movies;

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
  }, [isShort, listMovies.length, setRequestSearchError]);

  return (
    <>
      <Header loggedIn={loggedIn} />

      <Search
        onIsShort={handleIsShort}
        isShort={isShort}
        searchMovie={searchMovie}
      />

      <ErrorMessage requestSearchError={requestSearchError} />

      {isLoading && <Preloader />}

      {!isLoading && (
        <MoviesCardList
          onBookmark={onBookmark}
          onCheckBookmark={onCheckBookmark}
          movies={listMovies}
        />
      )}

      <Footer />
    </>
  );
}

export default Movies;
