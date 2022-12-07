//  Компонент с коллекцией фильмов  //
//  Используем стейты для подсчета числа карточек и ширины экрана  //
import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';
import * as params from '../../utils/constants';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  onBookmark,
  onCheckBookmark,
  removeSavedMovies,
  movies,
}) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';

  const [moviesOnView, setMoviesOnView] = React.useState(0);
  const [screen, setScreen] = React.useState(window.innerWidth);

  const countCards = () => {
    if (screen >= params.LARGESCREEN) {
      setMoviesOnView(params.DEFAULTONLARGESCREEN);
    } else if (screen < params.LARGESCREEN && screen >= params.MIDDLESCREEN) {
      setMoviesOnView(params.DEFAULTONMIDDLESCREEN);
    } else if (screen <= params.MIDDLESCREEN) {
      setMoviesOnView(params.DEFAULTONSMALLSCREEN);
    }
  }

  React.useEffect(() => {
    countCards();
  }, []);

  window.onresize = function () {
    setTimeout(() => {
      countCards();
      setScreen(window.innerWidth);
    }, 1000);
  };

  const handleLoadMore = () => {
    if (screen >= params.LARGESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONLARGESCREEN);
    } else if (screen < params.LARGESCREEN && screen >= params.MIDDLESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONMIDDLESCREEN);
    } else if (screen <= params.MIDDLESCREEN) {
      setMoviesOnView(moviesOnView + params.INCREASEONSMALLSCREEN);
    }
  }

  return (
    <section className='movies'>
      <ul className='movies__elements'>
        {movies.slice(0, savedMoviesPage ? movies.length : moviesOnView).map((item) => (
          <MoviesCard
            key={item.id || item.movieId}
            card={item}
            onBookmark={onBookmark}
            onCheckBookmark={onCheckBookmark}
            removeSavedMovies={removeSavedMovies}
          />
        ))}
      </ul>

      {/* скрыть кнопку если карточек нет или мало */}
      {!savedMoviesPage && movies.length > moviesOnView && (
        <More onLoadMore={handleLoadMore} />
      )}
    </section>
  );
}

export default MoviesCardList;
