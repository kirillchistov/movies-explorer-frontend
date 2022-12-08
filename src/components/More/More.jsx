//  Кнопка еще для вывода доп.карточек в галерее  //
import './More.css';

const More = ({ onLoadMore }) => {
  return (
    <button className='movies__button button link' onClick={onLoadMore}>
      Ещё
    </button>
  );
}

export default More;
