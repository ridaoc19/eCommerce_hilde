import { IModalConfirm } from "../../../interfaces/components/modalConfirm";

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