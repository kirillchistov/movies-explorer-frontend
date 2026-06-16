//  SearchForm — форма поиска, куда пользователь будет вводить запрос  //
import './SearchForm.css';

const SearchForm = ({ value, onSubmit, onChange }) => {
  return (
    <form className='search__form' name='search' onSubmit={onSubmit}>
      <input
        className='search__input'
        type='text'
        id='search'
        name='search'
        placeholder='Фильм'
        onChange={onChange}
        value={value}
      />
      <button type='submit' className='link search__button'></button>
    </form>
  );
}

export default SearchForm;
