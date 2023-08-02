import { useState } from 'react';
import { IUserOnChange } from '../interfaces/hooks/UserOnChange.interface';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUserError, selectUserError } from '../redux/reducers/user';
import { validationChange } from '../utils/validations/userValidation';


const useUserOnChange: IUserOnChange.UseOnChangeProps = (initialState) => {
  const dispatch = useAppDispatch();
  const errorBack = useAppSelector(selectUserError)
  const [change, setChange] = useState<IUserOnChange.UseOnChange>(initialState)

  const handleErrorOnBack: IUserOnChange.HandleErrorOnBackProps = () => {
    if (errorBack) Object.entries(errorBack).forEach(([nameBack, valueBack]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };

  const handleOnChange: IUserOnChange.HandleOnChangeProps = ({ name, value }) => {
    if (errorBack) dispatch(clearUserError());
    const { message, stop } = validationChange({ name: name, value, change })
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

export default useUserOnChange;



