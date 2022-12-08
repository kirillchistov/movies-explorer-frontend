//  Компонент для динамической подстановки сообщений об ошибках  //
import React, { useEffect, useState } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ requestSearchError }) => {
  const [isRequestError, setIsRequestError] = useState(false);
  const [messageRequestError, setMesageRequestError] = useState('');

  useEffect(() => {
    setIsRequestError(requestSearchError.isRequestError);
    setMesageRequestError(requestSearchError.messageRequestError);
  }, [requestSearchError]);

  return (
    <section className='error'>
      <p
        className={`${
          isRequestError
            ? 'error__message error__message_active'
            : 'error__message'
        }`}
      >
        {messageRequestError}
      </p>
    </section>
  );
}

export default ErrorMessage;
