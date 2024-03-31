import React, { ReactNode, useEffect, useState } from 'react';
import './message.scss';

interface MessageProps {
  children: ReactNode;
  open: boolean;
}

const Message: React.FC<MessageProps> = ({ children, open }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true)
    }
  }, [open])

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="message-overlay">
          <div className="message-container">
            <div className="message-content">
              <p>{children}</p>
              <button onClick={handleClose}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
