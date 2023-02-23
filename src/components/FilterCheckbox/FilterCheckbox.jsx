//  FilterCheckbox - фильтр с чекбоксом 'Только короткометражки'  //
import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import './FilterCheckbox.css';

const FilterCheckbox = ({onIsShortie, isShortie}) => {
  return (
    <div className='search__filter'>
      <ToggleSwitch
        status={isShortie}
        onColor='var(--color-green)'
        handleToggleClick={onIsShortie}
        name={'Короткометражки'}
      />
    </div>
  );
}

export default FilterCheckbox;
