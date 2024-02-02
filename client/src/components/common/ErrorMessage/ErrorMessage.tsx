import React, { useState, useEffect } from 'react';
import './errorMessage.scss';

interface ErrorMessageProps {
  errors: Array<{ field: string | 'general'; message: string }>;
  emptyMessage: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, emptyMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const errorContainer = document.querySelector('.error-container');
    document.body.classList.add('body-scroll-locked');

    const firstTimeout = setTimeout(() => {
      false && setIsVisible(false);
      if (errorContainer) {
        document.body.classList.remove('body-scroll-locked');
        errorContainer.classList.add('hide');
      }

      // Agregar el segundo setTimeout aquí
      const secondTimeout = setTimeout(() => {
        emptyMessage()
      }, 4000);

      // Limpiar el segundo timeout al desmontar el componente
      return () => clearTimeout(secondTimeout);
    }, 10000);

    // Limpiar el primer timeout al desmontar el componente
    return () => clearTimeout(firstTimeout);
  }, []);

  return isVisible ? (
    <div className="error-container">
      {errors.map(({ field, message }, index) => {
        return (
          <div key={index}>
            <h3>{field}:</h3>{" "}<p>{message}</p>
          </div>
        )
      })}
    </div>
  ) : null;
};

export default ErrorMessage;
