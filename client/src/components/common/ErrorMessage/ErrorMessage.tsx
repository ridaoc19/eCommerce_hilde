import React, { useState, useEffect } from 'react';
import './errorMessage.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return isVisible ? (
    <div className="error-container">
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorMessage;
