import React from 'react';

const NotFound: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="not-found-container">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página {!!text && `"${text}"`} que buscas no está disponible.</p>
    </div>
  );
};

export default NotFound;
