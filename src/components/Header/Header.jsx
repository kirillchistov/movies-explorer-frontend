//  Шапка страницы  //
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/headerlogo.svg';
import HeaderAuthorized from '../HeaderAuthorized/HeaderAuthorized';
import HeaderUnauthorized from '../HeaderUnauthorized/HeaderUnauthorized';

const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='Логотип дипломного проекта' className='header__logo' />
      </Link>
      {loggedIn ? <HeaderAuthorized /> : <HeaderUnauthorized />}
    </header>
  );
}

export default Header;
