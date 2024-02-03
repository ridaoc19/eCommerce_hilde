import { Dispatch, SetStateAction } from "react";
import useValidations from "../../../hooks/useValidations/useValidations";
import { HandleChangeText } from "../../../interfaces/global.interface";
import Input from "../Input/Input";
import Button from "../button/Button";
import { InitialStateFormAdvertising } from "./utils";

interface FormAdvertisingFormProps {
  initialStateFormAdvertising: InitialStateFormAdvertising;
  stateInput: InitialStateFormAdvertising;
  setStateInput: Dispatch<SetStateAction<InitialStateFormAdvertising>>
}

function FormAdvertisingForm({ initialStateFormAdvertising, stateInput, setStateInput }: FormAdvertisingFormProps) {
  const { getValidationErrors } = useValidations();

  const handleChange: HandleChangeText = ({ target }) => {
    const { name, message, stop } = getValidationErrors({ name: target.name, value: target.value })
    if (stop) return setStateInput({ ...stateInput, error: { ...stateInput.error, [name]: message } })
    setStateInput((prevState) => ({ ...prevState, change: { ...prevState.change, [name]: target.value, }, error: { ...prevState.error, [name]: message } }));
  };

  // Función para manejar el estado de las imágenes
  const handleImageChange = (key: keyof InitialStateFormAdvertising['change'], files: FileList | null): void => {
    if (files && files.length > 0) {
      setStateInput((prevState) => ({
        ...prevState,
        change: {
          ...prevState.change,
          [key]: files[0],
        },
      }));
    }
  };
  return (
    <>
      {(Object.keys(initialStateFormAdvertising.change).filter((key) => ['title', 'redirect', 'text'].includes(key) && key !== 'page' && key !== 'location') as (keyof Pick<InitialStateFormAdvertising['change'], 'title' | 'redirect' | 'text'>)[]).map((item) => (
        <Input
          key={item}
          styleClass={`login--${item}`}
          errorMessage={stateInput.error[item] || stateInput.error[item]}
          input={{ type: item, placeholder: item, value: stateInput.change[item], handleOnChange: handleChange, name: item }}
        />
      ))}
      {Object.entries(stateInput.change).filter((e) => ['image_desktop', 'image_phone', 'image_tablet'].includes(e[0])).map(([key, value]: any, index) => (
        <div key={index} className="advertising-form__input-images">
          <input id={`input__images`} multiple className={`input__images`} type="file" name={`images_${key}`} onChange={(event) => handleImageChange(key, event.target.files)} />
          <h5>{key}</h5>
          <div>
            {!!value && typeof value === 'object' ? <img src={URL.createObjectURL(value)} alt="" /> : <img src={value} height={"100%"} alt={``} />}
            <Button button={{
              type: 'dark', text: "Eliminar Imagen", handleClick: () => {
                const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
                if (inputElement) inputElement.value = '';
                setStateInput({ ...stateInput, change: { ...stateInput.change, [key]: "" } })
              },
            }} />
          </div>
        </div>
      ))}
    </>
  );
}

export default FormAdvertisingForm;