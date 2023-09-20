import React, { ReactNode, useContext } from 'react';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';


interface PopupProps {
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!

  const onClose = () => {
    dispatchContext({ type: ActionTypeDashboard.SELECT_INVENTORY, payload: { name: 'productsEmpty_id', value: "" } })
  }

  return (
    <div className="popup">
      <div className="popup-content">
        {children}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
