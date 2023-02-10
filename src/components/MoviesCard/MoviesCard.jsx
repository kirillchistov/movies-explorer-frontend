//  Компонент карточки фильма  //
import React from 'react';

import './MoviesCard.css';

const MoviesCard = ({ card }) => {

  return (
    <li className='element'>
      <div className='element__description'>
        <div>
          <h4 className='element__name'>{card.nameRU}</h4>
          <p className='element__duration'></p>
        </div>
        <button
          className='button '
          type='button'
        ></button>
      </div>
      <a href={card.trailerLink} target='blank' className='link'>
        <img
          src={card.imageSource}
          alt={`Иллюстрация фильма ${card.nameRU}`}
          className='element__image'
        />
      </a>
    </li>
  );
}

export default MoviesCard;
