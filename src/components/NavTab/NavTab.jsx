//  Компонент с навигационным меню страницы «О проекте»  //
import './NavTab.css';

const NavTab = () => {
  return (
    <nav>
      <ul className='nav-tab nav-tab_banner'>
        <li className='nav-tab__item'>
          <a href='#aboutproject' className='link nav-tab__item'>О проекте</a>
        </li>
        <li className='nav-tab__item'>
          <a href='#techs' className='link nav-tab__item'>Технологии</a>
        </li>
        <li className='nav-tab__item'>
          <a href='#aboutme' className='link nav-tab__item'>Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
