//  Фильтр поиска по фильмам (короткометражек)  //
import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import './SearchFilter.css';

function SearchFilter({onIsShort, isShort}) {
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

export default SearchFilter;
