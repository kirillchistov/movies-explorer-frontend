//  Шапка страниц  //
//  Импорт библиотек  //
import { Link } from 'react-router-dom';

//  Импорт стилей и лого  //
import './Header.css';
import logo from '../../images/headerlogo.svg';

//  Импорт компонентов навигации до и после логина  //
import HeaderLoggedIn from '../HeaderLoggedIn/HeaderLoggedIn';
import HeaderLoggedOut from '../HeaderLoggedOut/HeaderLoggedOut';

//  Условный рендер шапки (тернарно до / после логина)  //
const Header = ({ loggedIn }) => {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='Логотип дипломного проекта' className='header__logo' />
      </Link>
      {loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
    </header>
  );
}

export default Header;
