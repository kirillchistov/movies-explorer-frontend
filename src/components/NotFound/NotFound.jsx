//  Страница 404  //
//  Просто flex с заголовком, абзацем и кнопкой "Назад"  //
import { useHistory } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  const history = useHistory();

  const goBack = () => {
    history.go(-1);
  }

  return (
    <main className='page404'>
      <h2 className='page404__title'>404</h2>
      <p className='page404__description'>Страница не найдена</p>
      <button className='link button page404__back' onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
