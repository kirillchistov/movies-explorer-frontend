//  Компонент для динамической подстановки сообщений об ошибках  //
//  Пока используется только на "Фильмы" и "Сохраненные..."  //
import React, { useEffect, useState } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ apiSearchError }) => {
  //  Состояния ошибки стоит поднять до App  //
  const [isApiError, setIsApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  //  При монтировании обновляем состояние и текст ошибки  //
  useEffect(() => {
    setIsApiError(apiSearchError.isApiError);
    setApiErrorMessage(apiSearchError.apiErrorMessage);
  }, [apiSearchError]);

  //  Просто секция с блоком ошибки (не особо информативная)  //
  //  Не показывается, если ошибки нет  //
  return (
    <section className='error'>
      <p
        className={`${
          isApiError
            ? 'error__message error__message_active'
            : 'error__message'
        }`}
      >
        {apiErrorMessage}
      </p>
    </section>
  );
}

export default ErrorMessage;
