//  Компонент с формой для авторизации  //
import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

const AuthForm = ({
  onChange,
  onSubmit,
  isSubmitDisabled,
  formName,
  value,
  error,
  buttonText,
  text,
  link,
  linkText,
  requestError,

}) => {
  const { hasApiError, apiErrorMessage } = requestError;

  return (
    <main className='auth'>
      <form className='auth__form' name={formName} onSubmit={onSubmit}>
        <div className='auth__list'>
          {formName === 'form-signup' && (
            <div className='auth__item'>
              <span className='auth__caption'>Имя</span>
              <input
                autoFocus
                className={`${
                  error.name ? 'auth__input auth__input_active' : 'auth__input'
                }`}
                type='text'
                id='name'
                name='name'
                minLength='2'
                maxLength='40'
                required
                onChange={onChange}
                value={value.name || ''}
              />
              <span
                className={`${
                  error.name
                    ? 'auth__error_active auth__input_error'
                    : 'auth__input_error'
                }`}
              >
                {error.name}
              </span>
            </div>
          )}

          <div className='auth__item'>
            <span className='auth__caption'>E-mail</span>
            <input
              className={`${
                error.email ? 'auth__input auth__input_active' : 'auth__input'
              }`}
              type='email'
              id='email'
              name='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              title='Адрес email указан некорректно'
              required
              onChange={onChange}
              value={value.email || ''}
            />
            <span
              className={`${
                error.email
                  ? 'auth__error_active auth__input_error'
                  : 'auth__input_error'
              }`}
            >
              {error.email}
            </span>
          </div>

          <div className='auth__item'>
            <span className='auth__caption'>Пароль</span>
            <input
              className={`${
                error.password
                  ? 'auth__input auth__input_active'
                  : 'auth__input'
              }`}
              type='password'
              id='password'
              name='password'
              required
              onChange={onChange}
              value={value.password || ''}
            />
            <span
              className={`${
                error.password
                  ? 'auth__error_active auth__input_error'
                  : 'auth__input_error'
              }`}
            >
              {error.password}
            </span>
          </div>
        </div>

        <div className='auth__submit'>
          <span
            className={`${
              hasApiError ? 'auth__error auth__error_active' : 'auth__error'
            }`}
          >
            {apiErrorMessage}
          </span>
          <button
            className='auth__button'
            type='submit'
            aria-label={`Кнопка ${buttonText}`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
          <p className='auth__text'>
            {text}
            <Link className='link auth__link' to={link}>
              {linkText}
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
export default AuthForm;
