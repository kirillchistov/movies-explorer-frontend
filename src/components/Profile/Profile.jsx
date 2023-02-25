//  Компонент профиля  //
import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import Header from '../Header/Header';
import './Profile.css';

const Profile = ({ loggedIn, onLogout, onUpdateProfile, apiEditProfileError }) => {

  //  Получаем контекст текущего пользователя  //
  const currentUser = useContext(CurrentUserContext);
  //  Хук для обработки и валидации формы редактирования  //
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation('');
  //  Состояние отключения поля ввода (вкл. при редактировании)  //
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  //  Состояние отключения кнопки сохранить  //
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  //  Состояние кнопки редактирования профиля  //
  const [isEdit, setIsEdit] = useState(false);
  //  Состояние наличия ошибки API  //
  const [isApiError, setIsApiError] = useState(false);
  //  Состояние с текстом ошибки API  //
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  //  Обработка перевода профиля в режим редактирования  //
  //  Заполняем форму данными текущего пользователя, убираем ошибку, включаем инпуты  //
  const handleEditProfile = () => {
    resetForm(currentUser, {}, false); // newValues, newErrors, newIsValid  //
    setIsApiError(false);  // Очищаем ошибку
    setApiErrorMessage('');  // Очищаем тект ошибки
    setIsInputDisabled(false);  // Включаем поля ввода
    setIsEdit(!isEdit);  //  Переключаем состояние редактирования
  }

  //  Обработка сохранения изменных данных профиля  //
  //  Отключаем редирект, очищаем ошибку, отключаем инпуты и кнопку  //
  //  Сохраняем полученные данные имя и email, вызываем API обновления, очищаем форму  //
  const handleSubmit = (evt) => {
    evt.preventDefault();  // Отключаем редирект
    setIsApiError(false);  // очищаем ошибку
    setApiErrorMessage('');  // очищаем ошибку
    setIsInputDisabled(true);  // отключаем инпуты
    setIsSubmitDisabled(true);  // отключаем кнопку
    const newValues = {
      name: values.name === undefined ? currentUser.name : values.name,
      email: values.email === undefined ? currentUser.email : values.email,
    };
    onUpdateProfile(newValues);
    setIsEdit(!isEdit);
    resetForm(newValues, {}, false);
  }

  //  При монтировании сверяем данные профиля (с текущим) и меняем состояние кнопки сохранить  //
  useEffect(() => {
    setIsSubmitDisabled(
      isValid &&
        (values.name !== currentUser.name ||
          values.email !== currentUser.email),
    );
  }, [values.name, values.email, isValid, currentUser.name, currentUser.email]);

  //  При монтировании компонента устанавливаем состояние и текст ошибки API профиля  //
  //  Если появилась ошибка, сохраняем ее  //
  useEffect(() => {
    setIsApiError(apiEditProfileError.isApiError);
    setApiErrorMessage(apiEditProfileError.apiErrorMessage);
  }, [apiEditProfileError]);

//  По умолчанию при загрузке убираем ошибку  //
  useEffect(() => {
    setIsApiError(false);
    setApiErrorMessage('');
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='profile'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' name='profile' onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={values.name || currentUser.name}
                disabled={isInputDisabled}
                className={`${
                  errors.name
                    ? 'profile__input profile__input_active'
                    : 'profile__input'
                }`}
              />
            </div>
            <span
              className={`${
                errors.name
                  ? 'profile__error_active profile__input_error'
                  : 'profile__input_error'
              }`}
            >
              {errors.name}
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
                onChange={handleChange}
                value={values.email || currentUser.email}
                disabled={isInputDisabled}
                className={`${
                  errors.email
                    ? 'profile__input profile__input_active'
                    : 'profile__input'
                }`}
              />
            </div>
            <span
              className={`${
                errors.email
                  ? 'profile__error_active profile__input_error'
                  : 'profile__input_error'
              }`}
            >
              {errors.email}
            </span>
          </div>
          <div className='profile__submit'>
            <span
              className={`${
                isApiError
                  ? 'profile__error profile__error_active'
                  : 'profile__error'
              }`}
            >
              {apiErrorMessage}
            </span>
            {isEdit ? (
              <button
                className={
                  'profile__button profile__button_submit ' +
                  (!isSubmitDisabled ? '' : '')
                }
                type='submit'
                onClick={handleSubmit}
                disabled={!isSubmitDisabled}
              >
                Сохранить
              </button>
            ) : (
              <button
                className='profile__button profile__button_edit'
                type='button'
                onClick={handleEditProfile}
              >
                Редактировать
              </button>
            )}

            <button
              className='profile__button profile__button_signout '
              type='button'
              onClick={onLogout}
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
