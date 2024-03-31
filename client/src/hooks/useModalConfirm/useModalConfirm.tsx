import { FC, ReactNode, useState } from 'react';

interface ModalProps {
  message: string | ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirm: FC<ModalProps> = ({ message, onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <div>{message}</div>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
);

interface ModalConfirmHook {
  isModalOpen: boolean;
  openModal: (message: ModalProps['message'], onConfirmAction: () => void, onCancelAction: () => void) => void;
  closeModal: () => void;
  ModalComponent: ReactNode;
}

const useModalConfirm = (): ModalConfirmHook => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<ModalProps['message']>('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const openModal = (message: ModalProps['message'], onConfirmAction: () => void, onCancelAction: () => void) => {
    setModalMessage(message);
    setOnConfirm(() => () => {
      onConfirmAction();
      closeModal();
    });
    setOnCancel(() => () => {
      onCancelAction();
      closeModal();
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalProps = {
    message: modalMessage,
    onConfirm: onConfirm,
    onCancel: onCancel,
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    ModalComponent: isModalOpen ? <ModalConfirm {...modalProps} /> : null,
  };
};

export default useModalConfirm;
