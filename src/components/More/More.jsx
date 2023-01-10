//  Кнопка еще для вывода доп.карточек в галерее  //
import './More.css';

const More = ({ onLoadMore }) => {
  return (
    <button className='link movies__button button' onClick={onLoadMore}>
      Ещё
    </button>
  );
}

export default More;
