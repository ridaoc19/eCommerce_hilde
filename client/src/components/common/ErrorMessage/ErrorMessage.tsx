import React, { useContext, useEffect } from 'react';
import { CreateContext } from '../../../hooks/useContext';
import { IMessagesReducer } from '../../../hooks/useContext/messages/reducer';
import './errorMessage.scss';

const ErrorMessage: React.FC<IMessagesReducer.AppState> = ({ messages }) => {
  const { messages: { messagesContextDispatch } } = useContext(CreateContext)

  const closeMessage = (index: number) => {
    const filterMessage = messages.filter((_e, i) => i !== index)
    messagesContextDispatch({ type: IMessagesReducer.keyDashboard.MESSAGE_DELETE, payload: filterMessage })

    // const errorContainer = document.querySelector('.error-container');
    // if (errorContainer) {
    //   document.body.classList.remove('body-scroll-locked');
    //   errorContainer.classList.add('hide');
    // setTimeout(() => {
    //   emptyMessage();
    // }, 4000);
    // }
  };


  useEffect(() => {
    // document.body.classList.add('body-scroll-locked');

    const firstTimeout = setTimeout(() => {
      // const errorContainer = document.querySelector('.error-container');

      // if (errorContainer) {
      // closeMessage();
      // }
    }, 10000);

    return () => clearTimeout(firstTimeout);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="messages-general__container">
      {messages.map(({ message, status_code }, index) => (
        <div key={index} className={`messages-general__card ${getStatusColor(status_code)}`}>
          <button className="close-button" onClick={() => closeMessage(index)}>X</button>
          <div >
            <div>{message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Función para obtener el color según el código de estado
const getStatusColor = (status_code: number): string => {
  if (status_code >= 100 && status_code <= 199) {
    return 'information';
  } else if (status_code >= 200 && status_code <= 299) {
    return 'success';
  } else if (status_code >= 300 && status_code <= 399) {
    return 'warning';
  } else {
    return 'error';
  }
};

export default ErrorMessage;
