//  Шапка блока для авторизованного пользователя  //
import React, { useState } from 'react';

import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Burger from '../Burger/Burger';

const HeaderWithAuth = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseClick = () => {
    setIsOpen(false);
  }

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
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
            className='header__close button link'
            onClick={handleCloseClick}
          ></button>
          <Navigation type='column'/>
          <Account />
        </div>
      </div>
      <Burger isOpen={isOpen} onClick={handleBurgerClick} />
    </>
  );
}
export default HeaderWithAuth;
