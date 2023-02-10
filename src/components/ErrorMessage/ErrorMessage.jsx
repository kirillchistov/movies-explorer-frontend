//  Компонент для динамической подстановки сообщений об ошибках  //
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = () => {

  return (
    <section className='error'>
      <p
        className='error__message error__message_active'
      >
        Ошибочка вышла
      </p>
    </section>
  );
}

export default ErrorMessage;
