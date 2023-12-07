export namespace IModalConfirm {
  export enum ButtonNameConfirm {
    ModalConfirm = 'modalConfirm',
    ModalCancel = 'modalCancel'
  }

  export interface Props {
    message: string;
    handleOnClick: (data: React.MouseEvent<HTMLButtonElement>) => void,
    ModalConfirm: 'modalConfirm',
    ModalCancel: 'modalCancel'
  }
}

function ModalConfirm({ handleOnClick, message, ModalCancel, ModalConfirm }: IModalConfirm.Props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button name={ModalConfirm} onClick={handleOnClick}>Confirmar</button>
        <button name={ModalCancel} onClick={handleOnClick}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalConfirm;