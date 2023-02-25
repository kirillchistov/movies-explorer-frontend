//  Страница 404  //
//  Просто flex с заголовком, абзацем и кнопкой "Назад"  //
import { useHistory } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  const history = useHistory();

  const goBack = () => {
    history.go(-2);
  }

  return (
    <main className='notfound'>
      <h2 className='notfound__title'>404</h2>
      <p className='notfound__description'>Страница не найдена</p>
      <button className='notfound__back' onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
