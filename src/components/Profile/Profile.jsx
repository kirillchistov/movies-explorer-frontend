//  Компонент профиля  //
import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import Header from '../Header/Header';
import './Profile.css';

const Profile = ({
  loggedIn,
  onSignOut,
  onUpdateProfile,
  requestEditProfileError,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation('');

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const [isRequestError, setIsRequestError] = useState(false);
  const [messageRequestError, setMesageRequestError] = useState('');

  const handleEditProfile = () => {
    resetForm(currentUser, {}, false);
    setIsRequestError(false);
    setMesageRequestError('');
    setIsInputDisabled(false);
    setIsEdit(!isEdit);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsRequestError(false);
    setMesageRequestError('');
    setIsInputDisabled(true);
    setIsSubmitDisabled(true);
    const newValues = {
      name: values.name === undefined ? currentUser.name : values.name,
      email: values.email === undefined ? currentUser.email : values.email,
    };
    onUpdateProfile(newValues);
    setIsEdit(!isEdit);
    resetForm(newValues, {}, false);
  }

  useEffect(() => {
    setIsSubmitDisabled(
      isValid &&
        (values.name !== currentUser.name ||
          values.email !== currentUser.email),
    );
  }, [values.name, values.email, isValid, currentUser.name, currentUser.email]);

  useEffect(() => {
    setIsRequestError(requestEditProfileError.isRequestError);
    setMesageRequestError(requestEditProfileError.messageRequestError);
  }, [requestEditProfileError]);

  useEffect(() => {
    setIsRequestError(false);
    setMesageRequestError('');
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
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
