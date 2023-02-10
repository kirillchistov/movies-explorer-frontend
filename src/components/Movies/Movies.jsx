//   Movies — компонент страницы с поиском по фильмам  //
import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const Movies = () => {

  return (
    <>
      <main className='content'>
        <Search  />
        <ErrorMessage />
        <MoviesCardList  />
      </main>
    </>
  );
}

export default Movies;
