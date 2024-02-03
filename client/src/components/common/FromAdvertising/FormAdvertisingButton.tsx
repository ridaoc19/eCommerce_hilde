import Button from '../button/Button';
import { InitialStateFormAdvertising } from './utils';
interface FormAdvertisingButtonProps {
  handleItemClick: (data: { advertising_id: string, type: "edit" | "delete" | "save" }) => void
  handleClickEmpty: () => void
  status: InitialStateFormAdvertising['status']
}

function FormAdvertisingButton({ handleItemClick, handleClickEmpty, status }: FormAdvertisingButtonProps) {
  return (
    <div>
      <Button button={{ type: "dark", handleClick: () => handleItemClick({ advertising_id: "1", type: "save" }), text: status }} />
      <Button button={{ type: "dark", handleClick: handleClickEmpty, text: "Limpiar" }} />
    </div>
  );
}

export default FormAdvertisingButton;