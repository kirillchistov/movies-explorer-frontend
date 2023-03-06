//  Компонент, который отвечает за меню навигации на сайте  //
import { NavLink } from 'react-router-dom';
import './Navigation.css';

//  Рендер комонента с простой адаптивностью flex row или column  //
const Navigation = () => {
  return (
    <nav className='navigation'>
      <NavLink exact to='/' activeClassName='navigation__item_active' className='navigation__item'>
        Главная
      </NavLink>
      <NavLink exact to='/movies' activeClassName='navigation__item_active' className='navigation__item'>
        Фильмы
      </NavLink>
      <NavLink exact to='/saved-movies' activeClassName='navigation__item_active' className='navigation__item'>
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
