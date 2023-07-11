import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectUserError } from '../../redux/reducers/user';
import { validationChange } from '../utils/validation';

interface FormState {
  [key: string]: { change: string; message: string };
}


function useOnChange(initialState: FormState) {
  const [change, setChange] = useState<FormState>(initialState)


  const handleErrorOnBack = ({ errorBack }: { errorBack: any }) => {
    Object.entries(errorBack).forEach(([nameBack, valueBack]: [nameBack: string, valueBack: any]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };


  const handleOnChange = ({ name, value }: { name: keyof FormState, value: any }) => {
    const { message, stop } = validationChange({ name: name.toString(), value, change })
    setChange(prevState => {
      if (!stop) {
        return ({ ...prevState, [name]: { ...prevState[name], change: value, message: message } })
      } else {
        return ({ ...prevState, [name]: { ...prevState[name], message: message } })
      }
    })
  };

  return { change, handleOnChange, handleErrorOnBack };
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