//  Компонент карточки фильма  //
import React from 'react';
import { useLocation } from 'react-router-dom';
import {BASEMOVIE} from '../../utils/constants';

import './MoviesCard.css';

const MoviesCard = ({ onBookmark, checkBookmark, deleteBookmark, card }) => {

  //  проверяем на какой мы странице  //
  const location = useLocation();

  const allMoviesPage = location.pathname === '/movies';
  const savedMoviesPage = location.pathname === '/saved-movies';

  //  Ставим класс на кнопку в зависимости от страницы и статуса закладки  //
  const buttonClassName = savedMoviesPage
    ? `element__bookmark element__bookmark_delete link`
    : `element__bookmark ${
        checkBookmark(card)
          ? 'element__bookmark_add'
          : 'element__bookmark_empty'
      } link`;

  const imageSource = allMoviesPage
    ? `${BASEMOVIE}${card.image.url}`
    : card.image;

  //  Приводим хронометраж к формату "чч:мм" //
  //  Минуты делим на 60 с округлением вниз, получаем целые часы  //
  //  Остаток минут от деления на 60 запиысываем в минуты  //
  const duration = () => {
    const hours = Math.floor(card.duration / 60);
    const minutes = card.duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  //  Обрабатываем клик по лайку-закладке  //
  const handleClickButton = () => {
    //  На главной "Фильмы" ставим лайк и нужную картинку  //
    if (allMoviesPage) {
      onBookmark({ ...card, image: imageSource, thumbnail: imageSource });
    }
    //  На странице "Сохраненные" при клике убираем из закладок  //
    if (savedMoviesPage) {
      deleteBookmark(card);
    }
  }

  return (
    <li className='element'>
      <div className='element__description'>
        <div>
          <h4 className='element__name'>{card.nameRU}</h4>
          <p className='element__duration'>{duration()}</p>
        </div>
        <button
          className={buttonClassName}
          onClick={handleClickButton}
          type='button'>
        </button>
      </div>
      <a href={card.trailerLink} title="Трейлер" target='blank' className='link'>
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
