//  Компонент формы поиска по фильмам  //
import './SearchForm.css';

function SearchForm({ value, onSubmit, onChange }) {
  return (
    <form className='search__form' name='search' onSubmit={onSubmit}>
      <input
        className='search__input'
        type='text'
        id='search'
        name='search'
        // minLength='2'
        // required
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
