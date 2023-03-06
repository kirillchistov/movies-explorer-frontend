//  Компонент с формой регистрации  //
import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Register.css';

const Register = ({ onRegister, apiRegisterError }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const isDisabled = !isValid;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onRegister(values);
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
        apiError={apiRegisterError}
      />
    </>
  );
}

export default Register;
