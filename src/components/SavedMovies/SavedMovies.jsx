//  Компонент с галереей сохраненных фильмов  //
//  Применяем фильтр по короткометражкам isShort //

import React from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import saved from '../../utils/saved';
import Footer from '../Footer/Footer';

const SavedMovies = () => {

  return (
    <>
      <Header loggedIn={true} />
      <main className='content'>
        <Search />
        <MoviesCardList cards={saved} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
