//  Компонент профиля  //
import React from 'react';

import './Profile.css';

const Profile = () => {

  return (
    <>
      <main className='profile'>
        <h2 className='profile__title'>{`Привет, Кирилл!`}</h2>
        <form className='profile__form' name='profile' onSubmit={console.log('Форма отправлена')}>
          <div className='profile__list'>
            <div className='profile__item'>
              <span className='profile__caption'>Имя</span>
              <input
                type='text'
                id='name'
                name='name'
                required
                minLength='2'
                maxLength='40'
                onChange={console.log('данные изменены')}
                defaultValue='Ben'
                value={'Kirill'}
                disabled={false}
                className='profile__input profile__input_active'
              />
            </div>
            <span
              className='profile__error_active profile__input_error'
            >
              Ошибочка вышла
            </span>
            <div className='profile__item'>
              <span className='profile__caption'>E-mail</span>
              <input
                type='email'
                id='email'
                name='email'
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                title='Это неполный адрес email'
                required
                onChange={console.log('данные изменены')}
                value='e@mail.ru'
                defaultValue='123@123.ru'
                disabled={false}
                className='profile__input profile__input_active'
              />
            </div>
            <span
              className='profile__error_active profile__input_error'
            >
              Ошибочка вышла
            </span>
          </div>
          <div className='profile__submit'>
            <span
              className='profile__error profile__error_active'
            >
              Ошибочка вышла
            </span>

            <button
              className='button link profile__button profile__button_edit'
              type='button'
              onClick={console.log('Кнопка нажата')}
            >
              Редактировать
            </button>

            <button
              className='profile__button profile__button_signout'
              type='button'
              onClick={console.log('Кнопка нажата')}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Profile;
