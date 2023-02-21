//  Шапка блока для авторизованного пользователя  //
//  Импорт библиотек  //
import React, { useState } from 'react';

//  Импорт вложенных компонентов нав, имя, меню-бургер  //
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Burger from '../Burger/Burger';

//  Рендер верстки с условием по состоянтю меню-бургера  //
const HeaderLoggedIn = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClickBurger = () => {
    setIsOpen(!isOpen);
  }

    const handleClickClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <div className='header__desktop'>
        <Navigation type='row'/>
        <Account />
      </div>
      <div className={isOpen ? 'header__mobile' : 'header__mobile hidden'}>
        <div className='header__container'>
          <button
            className='link header__close'
            onClick={handleClickClose}>
          </button>
          <Navigation type='column'/>
          <Account />
        </div>
      </div>
      <Burger isOpen={isOpen} onClick={handleClickBurger} />
    </>
  );
}
export default HeaderLoggedIn;
