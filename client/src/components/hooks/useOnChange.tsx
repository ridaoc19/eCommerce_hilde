import { ChangeEvent, useState } from 'react';
import validation from '../utils/validation';

interface FormState {
  [key: string]: { change: string; message: string };
}
function useOnChange(initialState: FormState) {
  const [change, setChange] = useState<FormState>(initialState)

  const handleOnChange = (fieldName: keyof FormState, { target }: ChangeEvent<HTMLInputElement>,) => {
    const { name, value } = target
    const { message, stop } = validation({ name, value, change })

    // if (!stop) setChange(prevState => ({ ...prevState, [fieldName]: { ...prevState[fieldName], change: value, message: message } }));


    setChange(prevState => {
      if (!stop) {
        return ({ ...prevState, [fieldName]: { ...prevState[fieldName], change: value, message: message } })
      } else {
        return ({ ...prevState, [fieldName]: { ...prevState[fieldName], message: message } })
      }
    })

    // setChange(prevState => ({ ...prevState, [fieldName]: { ...prevState[fieldName], change: value } }));
    // setChange(prevState => ({ ...prevState, [fieldName]: { ...prevState[fieldName], message: message } }));
    // setChange(prevState => ({ ...prevState, [fieldName]: { ...prevState[fieldName], change: value, message: message } }));



  };

  return { change, handleOnChange };
}

export default useOnChange;


// ABC
// Una letra mayúscula
// abc
// Una letra minúscula
// 123
// Un número
// ***
// Mínimo 8 caracteres