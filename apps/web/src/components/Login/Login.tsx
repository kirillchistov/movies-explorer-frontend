//  Login — компонент страницы авторизации  //
import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Login.css';

const Login = ({ onLogIn, apiLoginError, onAuthErrorReset }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isDisabled = !isValid;

  const handleInputChange = (evt) => {
    onAuthErrorReset();
    handleChange(evt);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogIn(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <>
      <AuthHeader title='Рады видеть!' />
      <AuthForm
        formName='form-signin'
        buttonText='Войти'
        text='Ещё не зарегистрированы? '
        linkText='Регистрация'
        link='/signup'
        onSubmit={handleSubmit}
        isSubmitDisabled={isDisabled}
        onChange={handleInputChange}
        value={values}
        error={errors}
        apiError={apiLoginError}
      />
    </>
  );
}

export default Login;
