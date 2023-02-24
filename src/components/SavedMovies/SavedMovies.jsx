//  Компонент с галереей сохраненных фильмов  //
//  Применяем фильтр по короткометражкам isShortie //

import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import saved from '../../utils/saved';
import './SavedMovies.css';

const SavedMovies = () => {

  return (
    <>
      <Header />
        <main className='content'>
          <Search />
          <MoviesCardList cards={saved} />
        </main>
    </>
  );
}

export default SavedMovies;
