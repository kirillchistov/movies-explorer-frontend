//  Компонент для динамической подстановки сообщений об ошибках  //
import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ requestSearchError }) {
  const [isRequestError, setIsRequestError] = React.useState(false);
  const [messageRequestError, setMesageRequestError] = React.useState('');

  React.useEffect(() => {
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
