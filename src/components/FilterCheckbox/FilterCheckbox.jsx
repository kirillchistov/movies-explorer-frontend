//  FilterCheckbox - фильтр с чекбоксом 'Только короткометражки'  //
import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import './FilterCheckbox.css';

const FilterCheckbox = ({onIsShort, isShort}) => {
  return (
    <div className='search__filter'>
      <ToggleSwitch
        status={isShort}
        onColor='var(--color-green)'
        handleToggleClick={onIsShort}
        name={'Короткометражки'}
      />
    </div>
  );
}

export default FilterCheckbox;
