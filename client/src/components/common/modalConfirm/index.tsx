export namespace IModalConfirm {
  export enum ButtonNameConfirm {
    Confirm = 'confirm',
    Cancel = 'cancel'
  } export interface Props {
    message: string;
    handleOnClick: (data: React.MouseEvent<HTMLButtonElement>) => void,
    Confirm: 'confirm',
    Cancel: 'cancel'
  }
}

function ModalConfirm({ handleOnClick, message, Confirm, Cancel }: IModalConfirm.Props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button name={Confirm} onClick={handleOnClick}>Confirmar</button>
        <button name={Cancel} onClick={handleOnClick}>Cancelar</button>
      </div>
    </div>
  );
}

export default ModalConfirm;