//  Компонент карточки фильма  //
//  Название на русском, хроно, Like-кнопка картинка со ссылкой на трейлер  //
import React from 'react';
import { useLocation } from 'react-router-dom';
import {BASEMOVIE} from '../../utils/constants';

import './MoviesCard.css';

const MoviesCard = ({ onSave, isMovieSaved, deleteSaved, card }) => {

  //  проверяем на какой мы странице  //
  const location = useLocation();

  const allMoviesPage = location.pathname === '/movies';
  const savedMoviesPage = location.pathname === '/saved-movies';

  //  Ставим класс на кнопку в зависимости от страницы и статуса закладки  //
  const buttonClassName = savedMoviesPage
    ? `element__bookmark element__bookmark_delete link`
    : `element__bookmark ${
        isMovieSaved(card)
          ? 'element__bookmark_add'
          : 'element__bookmark_empty'
      } link`;

  const imageSource = allMoviesPage
    ? `${BASEMOVIE}${card.image.url}`
    : card.image;

  //  Приводим хронометраж к формату "чч:мм" //
  const duration = () => {
    //  Минуты делим на 60 с округлением вниз, получаем целые часы  //
    const hours = Math.floor(card.duration / 60);
  //  Остаток минут от деления на 60 запиысываем в минуты  //
    const minutes = card.duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  //  Обрабатываем клик по лайку-закладке  //
  const handleClickButton = () => {
    //  На главной "Фильмы" ставим лайк и нужную картинку  //
    if (allMoviesPage) {
      onSave({ ...card, image: imageSource, thumbnail: imageSource });
    }
    //  На странице "Сохраненные" при клике убираем из закладок  //
    if (savedMoviesPage) {
      deleteSaved(card);
    }
  }

  //  разметка элемента списка со структурой карточки фильма  //
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
