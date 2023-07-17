import { useState } from 'react';
import { validationChange } from '../../utils/validation';
import { ReduxUser } from '../../../redux/reducers/user/interface';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserError } from '../../../redux/reducers/user';


function useOnChange(initialState: PropsUseChange) {
  const dispatch = useAppDispatch();
  const errorBack = useAppSelector(selectUserError)
  const [change, setChange] = useState<PropsUseChange>(initialState)

  // type MyObject = Record<string, string | number>;

  const handleErrorOnBack = ({ errorBack }: { errorBack: Pick<ReduxUser.PostState, 'error'> }) => {
    Object.entries(errorBack).forEach(([nameBack, valueBack]: [string, string]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };

  console.log(errorBack)

  const handleOnChange = ({ name, value }: PropsOnChange) => {
    if (errorBack) dispatch(clearUser());
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

interface value<T> {
  [key: string]: T
}

export interface PropsOnChange {
  name: keyof PropsUseChange
  value: string
}