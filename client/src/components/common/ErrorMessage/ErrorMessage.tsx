import React, { useContext, useEffect } from 'react';
import './errorMessage.scss';
import { IErrorReducer } from '../../../hooks/useContext/error/reducer';
import { CreateContext } from '../../../hooks/useContext';

interface ErrorMessageProps {
  errors: Array<{
    field: string | 'general';
    status_code: number,
    message: string | React.ReactNode
  }>;
  // emptyMessage: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  const { error: { errorContextDispatch } } = useContext(CreateContext)

  const closeMessage = (index: number) => {
    const filterMessage = errors.filter((_e, i) => i !== index)
    errorContextDispatch({ type: IErrorReducer.keyDashboard.MESSAGE_DELETE, payload: filterMessage })

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
      {errors.map(({ message, status_code }, index) => (
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
