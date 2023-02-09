//  Шапка блока для авторизованного пользователя  //
//  Импорт библиотек  //
import React from 'react';

//  Импорт вложенных компонентов нав, имя, меню-бургер  //
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Burger from '../Burger/Burger';

//  Рендер верстки с условием по состоянтю меню-бургера  //
const HeaderAuth = () => {

  return (
    <>
      <div className='header__desktop'>
        <Navigation type='row'/>
        <Account />
      </div>
      <div className={'header__mobile hidden'}>
        <div className='header__container'>
          <button
            className='link header__close'
          ></button>
          <Navigation type='column'/>
          <Account />
        </div>
      </div>
      <Burger />
    </>
  );
}
export default HeaderAuth;
