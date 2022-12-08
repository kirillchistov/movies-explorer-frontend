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
        encType='text/plain'
        placeholder='Фильм'
        onChange={onChange}
        value={value}
      />
      <button type='submit' className='button search__button link'></button>
    </form>
  );
}

export default SearchForm;
