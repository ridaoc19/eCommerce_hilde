import { useState } from 'react';
import { validationChange } from '../../utils/validation';
import { ReduxUser } from '../../../redux/reducers/user/interface';


function useOnChange(initialState: PropsUseChange) {
  const [change, setChange] = useState<PropsUseChange>(initialState)


  const handleErrorOnBack = ({ errorBack }: { errorBack: Pick<ReduxUser.PostState, 'error'>}) => {
    Object.entries(errorBack).forEach(([nameBack, valueBack]: [string, any]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };

  const handleOnChange = ({ name, value }: PropsOnChange) => {
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


// ==============================|| INTERFACE ||============================== //

  export interface PropsUseChange {
    [key: string]: { change: string; message: string };
  }
  
  export interface PropsOnChange {
    name: keyof PropsUseChange
    value: string
  }