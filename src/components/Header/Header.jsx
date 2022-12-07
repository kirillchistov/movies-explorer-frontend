//  Шапка страницы  //
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/headerlogo.svg';
import HeaderWithAuth from '../HeaderWithAuth/HeaderWithAuth';
import HeaderNotAuth from '../HeaderNotAuth/HeaderNotAuth';

function Header({ isLoggedIn }) {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='Логотип дипломного проекта' className='header__logo' />
      </Link>
      {isLoggedIn ? <HeaderWithAuth /> : <HeaderNotAuth />}
    </header>
  );
}

export default Header;
