//  Компонент для навигации по аккаунту в профиле  //
import { Link } from 'react-router-dom';
import './Account.css';

function Account() {
  return (
    <Link className='account link' to='/profile'>
      Аккаунт
    </Link>
  );
}

export default Account;
