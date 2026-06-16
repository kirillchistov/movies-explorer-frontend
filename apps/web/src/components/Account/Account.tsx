//  Компонент для навигации по аккаунту в профиле  //
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
  return (
    <Link className='link account' to='/profile'>
      Аккаунт
    </Link>
  );
}

export default Account;
