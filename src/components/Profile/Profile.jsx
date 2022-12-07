//  Компонент профиля  //
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import Header from '../Header/Header';
import './Profile.css';

function Profile({
  isLoggedIn,
  onSignOut,
  onUpdateProfile,
  requestEditProfileError,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation('');

  const [isInputDisabled, setIsInputDisabled] = React.useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

  const [isEdit, setIsEdit] = React.useState(false);

  const [isRequestError, setIsRequestError] = React.useState(false);
  const [messageRequestError, setMesageRequestError] = React.useState('');

  function handleEditProfile() {
    resetForm(currentUser, {}, false);
    setIsRequestError(false);
    setMesageRequestError('');
    setIsInputDisabled(false);
    setIsEdit(!isEdit);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // очищаю ошибку и блокирую поля ввода
    setIsRequestError(false);
    setMesageRequestError('');
    setIsInputDisabled(true);
    setIsSubmitDisabled(true);
    // Передаём значения управляемых компонентов во внешний обработчик
    const newValues = {
      name: values.name === undefined ? currentUser.name : values.name,
      email: values.email === undefined ? currentUser.email : values.email,
    };
    onUpdateProfile(newValues);
    setIsEdit(!isEdit);
    resetForm(newValues, {}, false);
  }

  React.useEffect(() => {
    setIsSubmitDisabled(
      isValid &&
        (values.name !== currentUser.name ||
          values.email !== currentUser.email),
    );
  }, [values.name, values.email, isValid, currentUser.name, currentUser.email]);

  React.useEffect(() => {
    setIsRequestError(requestEditProfileError.isRequestError);
    setMesageRequestError(requestEditProfileError.messageRequestError);
  }, [requestEditProfileError]);

  React.useEffect(() => {
    setIsRequestError(false);
    setMesageRequestError('');
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className='profile'>
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
                isRequestError
                  ? 'profile__error profile__error_active'
                  : 'profile__error'
              }`}
            >
              {messageRequestError}
            </span>
            {isEdit ? (
              <button
                className={
                  'profile__button profile__button_submit button ' +
                  (!isSubmitDisabled ? '' : 'link')
                }
                type='submit'
                onClick={handleSubmit}
                disabled={!isSubmitDisabled}
              >
                Сохранить
              </button>
            ) : (
              <button
                className='profile__button profile__button_edit button link'
                type='button'
                onClick={handleEditProfile}
              >
                Редактировать
              </button>
            )}

            <button
              className='profile__button profile__button_signout button link'
              type='button'
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
