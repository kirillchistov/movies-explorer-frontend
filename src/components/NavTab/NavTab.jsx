//  Компонент с навигацией по странице «О проекте»  //
import './NavTab.css';

function NavTab() {
  return (
    <nav>
      <ul className='nav-tab nav-tab_banner'>
        <li className='nav-tab__item'>
          <a href='#aboutproject' className='nav-tab__item link'>О проекте</a>
        </li>
        <li className='nav-tab__item'>
          <a href='#techs' className='nav-tab__item link'>Технологии</a>
        </li>
        <li className='nav-tab__item'>
          <a href='#aboutme' className='nav-tab__item link'>Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
