import { ChangeEvent, useState } from 'react';
import validation from '../utils/validation';

interface FormState {
  [key: string]: { change: string; message: string };
}
function useOnChange(initialState: FormState) {
  const [change, setChange] = useState<FormState>(initialState)

  const handleOnChange = (fieldName: keyof FormState, { target }: ChangeEvent<HTMLInputElement>,) => {
    const { name, value } = target
    const { message, stop } = validation({ name, value })

    !stop && setChange(prevState => ({ ...prevState, [fieldName]: { ...prevState[fieldName], change: value, message: message } }));
  };

  return { change, handleOnChange };
}

export default useOnChange;
