//  Контейнер для фильтра Короткометражки  //
import React from 'react';
//  import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import './FilterCheckbox.css';

const FilterCheckbox = ({ onIsShortie, isShortie }) => {
  //  Фильтр: чекбокс + лейбл с фоном + спан с фоном + фикс. текстблок  //
  //  При включении фильтра меняем состояние, фон #2BE080, фон спана "вкл."  //
  return (
    <div className='search__filter'>
      <input
        className='search__toggleswitch'
        id={`toggleswitch`}
        type='checkbox'
        onChange={onIsShortie}
        checked={isShortie}
      />
      <label
        className='search__toggleswitch-label'
        style={{ background: isShortie && 'var(--color-green)' }}
        htmlFor={`toggleswitch`}
      >
        <span className={`search__toggleswitch-button`} />
        <p className='search__toggleswitch-caption'>{'Короткометражки'}</p>
      </label>
    </div>
  );
}

/*
      <ToggleSwitch
        status={isShortie}
        onColor='var(--color-green)'
        handleToggleSwitch={onIsShortie}
        name={'Короткометражки'}
      />
*/

export default FilterCheckbox;
