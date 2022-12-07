//  Компонент с формой поиска  //
import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import SearchFilter from '../SearchFilter/SearchFilter';

import './Search.css';

function Search({ searchMovie, onIsShort, isShort }) {
  const location = useLocation();
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setSearchText('');
    location.pathname === '/movies' && localStorage.getItem('searchText') && setSearchText(localStorage.getItem('searchText'));
  }, [location]);

  function handleSubmit(evt) {
    evt.preventDefault();
    searchMovie(searchText);
    location.pathname === '/movies' && localStorage.setItem('searchText', evt.target.search.value);
  }

  function handleChange(evt) {
    setSearchText(evt.target.value);
  }

  return (
    <section className='search'>
      <SearchForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={searchText == null ? '' : searchText}
      />
      <SearchFilter onIsShort={onIsShort} isShort={isShort} />
      <div className='decoration'> </div>
    </section>
  );
}

export default Search;
