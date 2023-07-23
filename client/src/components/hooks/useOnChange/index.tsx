import { useState } from 'react';
import { validationChange } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserError } from '../../../redux/reducers/user';
import { IOnChange } from '../../utils/interface/onChange';

function useOnChange(initialState: IOnChange.PropsUseChange) {
  const dispatch = useAppDispatch();
  const errorBack = useAppSelector(selectUserError)
  const [change, setChange] = useState<IOnChange.PropsUseChange>(initialState)

  const handleErrorOnBack = () => {
    if (errorBack) Object.entries(errorBack).forEach(([nameBack, valueBack]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };

  const handleOnChange = ({ name, value }: IOnChange.PropsOnChange) => {
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



