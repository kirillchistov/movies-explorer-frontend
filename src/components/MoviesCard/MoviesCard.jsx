//  Компонент карточки фильма  //
import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

const MoviesCard = ({ onBookmark, onCheckBookmark, removeSavedMovies, card }) => {
  const location = useLocation();

  const handleClick = () => {
    if (allMoviesPage) {
      onBookmark({ ...card, image: imageSource, thumbnail: imageSource });
    }
    if (savedMoviesPage) {
      removeSavedMovies(card);
    }
  }

  const allMoviesPage = location.pathname === '/movies';
  const savedMoviesPage = location.pathname === '/saved-movies';
  const buttonClassName = savedMoviesPage
    ? `element__bookmark element__bookmark_delete link`
    : `element__bookmark ${
        onCheckBookmark(card)
          ? 'element__bookmark_add'
          : 'element__bookmark_empty'
      } link`;
  const imageSource = allMoviesPage
    ? `https://api.nomoreparties.co/${card.image.url}`
    : card.image;

  // длительность фильма в формат чч:мм
  const time = () => {
    const hours = Math.floor(card.duration / 60);
    const minutes = card.duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className='element'>
      <div className='element__description'>
        <div>
          <h4 className='element__name'>{card.nameRU}</h4>
          <p className='element__duration'>{time()}</p>
        </div>
        <button
          className={buttonClassName}
          type='button'
          onClick={handleClick}
        ></button>
      </div>
      <a href={card.trailerLink} target='blank' className='link'>
        <img
          src={imageSource}
          alt={`Иллюстрация фильма ${card.nameRU}`}
          className='element__image'
        />
      </a>
    </li>
  );
}

export default MoviesCard;