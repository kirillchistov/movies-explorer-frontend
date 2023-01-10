//  Компонент с формой регистрации  //
import React, { useEffect } from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Register = ({ onSignUp, requestSignUpError }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isDisabled = !isValid;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onSignUp(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <>
      <AuthHeader title='Добро пожаловать!' />
      <AuthForm
        formName='form-signup'
        buttonText='Зарегистрироваться'
        text='Уже зарегистрированы? '
        linkText='Войти'
        link='/signin'
        onSubmit={handleSubmit}
        isSubmitDisabled={isDisabled}
        onChange={handleChange}
        value={values}
        error={errors}
        requestError={requestSignUpError}
      />
    </>
  );
}

export default Register;
