//  Компонент, который отвечает за меню навигации на сайте  //
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({type}) => {
  const navigationClassName = type==='row' ? `navigation__item navigation__item_row link` : `navigation__item navigation__item_column link`

  return (
    <nav className={type==='row' ? 'navigation navigation_row' : 'navigation navigation_column'}>
      <NavLink exact to='/' activeClassName='navigation__item_active' className={navigationClassName}>  
        Главная
      </NavLink>
      <NavLink exact to='/movies' activeClassName='navigation__item_active' className={navigationClassName}>
        Фильмы
      </NavLink>
      <NavLink exact to='/saved-movies' activeClassName='navigation__item_active' className={navigationClassName}>
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;
