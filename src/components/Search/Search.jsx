//  Компонент с формой поиска и фильтром по короткометражкам  //
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './Search.css';

const Search = ({ searchMovie, onIsShort, isShort }) => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSearchText('');
    location.pathname === '/movies' && localStorage.getItem('searchText') && setSearchText(localStorage.getItem('searchText'));
  }, [location]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchMovie(searchText);
    location.pathname === '/movies' && localStorage.setItem('searchText', evt.target.search.value);
  }

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  }

  return (
    <section className='search'>
      <SearchForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={searchText == null ? '' : searchText}
      />
      <FilterCheckbox onIsShort={onIsShort} isShort={isShort} />
      <div className='decoration'> </div>
    </section>
  );
}

export default Search;
