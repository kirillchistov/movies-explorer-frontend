//   Movies — компонент страницы с поиском по фильмам  //
import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const Movies = () => {

  return (
    <>
      <Header />
      <main className='content'>
        <Search  />
        <ErrorMessage />
        <MoviesCardList  />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
