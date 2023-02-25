//  Компонент для динамической подстановки сообщений об ошибках  //
import React, { useEffect, useState } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ apiSearchError }) => {
  const [isApiError, setIsApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(() => {
    setIsApiError(apiSearchError.isApiError);
    setApiErrorMessage(apiSearchError.apiErrorMessage);
  }, [apiSearchError]);

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
