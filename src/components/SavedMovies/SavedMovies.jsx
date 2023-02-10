//  Компонент с галереей сохраненных фильмов  //
//  Применяем фильтр по короткометражкам isShort //

import React from 'react';
import './SavedMovies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import saved from '../../utils/saved';

const SavedMovies = () => {

  return (
    <>
      <main className='content'>
        <Search />
        <MoviesCardList cards={saved} />
      </main>
    </>
  );
}

export default SavedMovies;
