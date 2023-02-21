//   Movies — компонент страницы с поиском по фильмам  //
import React from 'react';
import './Movies.css';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const Movies = () => {

const [movies, setMovies] = React.useState([]);
const [shortMovies, setShortMovies] = React.useState([]);
const [searchMovie, setSearchMovie] = React.useState('');
const [isShort, setIsShort] = React.useState(false);

React.useEffect(() => {

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


  return (
    <>
      <main className='content'>
        <Search
          searchMovie={setSearchMovie}
          isShort={isShort}
          onIsShort={setIsShort}

        />
        <ErrorMessage />
        <MoviesCardList movies = {isShort ? shortMovies : movies} />
      </main>
    </>
  );
}

export default Movies;
