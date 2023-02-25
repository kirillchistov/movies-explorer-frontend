//  Компонент с формой поиска и фильтром по короткометражкам  //
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './Search.css';

const Search = ({ searchMovie, onIsShortie, isShortie }) => {
  const location = useLocation();
  //  Состояние для поисковой строки  //
  const [searchQuery, setSearchQuery] = useState('');

  //  Обнуляем поисковую строку при монтировании компонента  //
  //  Если мы на странице "Фильмы", то достаем из лок.хран. последний запрос  //
  useEffect(() => {
    setSearchQuery('');
    location.pathname === '/movies' && localStorage.getItem('searchQuery') && setSearchQuery(localStorage.getItem('searchQuery'));
  }, [location]);

  //  При нажатии на кнопку поиска, ищем и обновляем запрос в лок.хран.  //
  const handleSubmit = (evt) => {
    evt.preventDefault();  // отключаем редирект при нажатии
    searchMovie(searchQuery);
    location.pathname === '/movies' && localStorage.setItem('searchQuery', evt.target.search.value);
  }

  //  При вводе поиск. запроса, обновляем рендер значения в поле ввода  //
  const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  //  Возвращаем секцию с Формой поиска, Фильтром короткометражек и декоративным блоком  //
  return (
    <section className='search'>
      <SearchForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={searchQuery == null ? '' : searchQuery}
      />
      <FilterCheckbox onIsShortie={onIsShortie} isShortie={isShortie} />
      <div className='decoration'> </div>
    </section>
  );
}

export default Search;
