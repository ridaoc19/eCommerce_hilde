import React from 'react';

function Loading() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner-inner">
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
      </div>
    </div>
  );
}

export default Loading;