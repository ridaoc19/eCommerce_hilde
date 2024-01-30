import Button from '../button/Button';
interface FormAdvertisingButtonProps {
  handleItemClick: (data: { advertising_id: string, type: "edit" | "delete" | "save" }) => void
  handleClickEmpty: () => void
}

function FormAdvertisingButton({ handleItemClick, handleClickEmpty }: FormAdvertisingButtonProps) {
  return (
    <div>
      <Button button={{ type: "dark", handleClick: () => handleItemClick({ advertising_id: "1", type: "save" }), text: "Guardar" }} />
      <Button button={{ type: "dark", handleClick: handleClickEmpty, text: "Limpiar" }} />
    </div>
  );
}

export default FormAdvertisingButton;