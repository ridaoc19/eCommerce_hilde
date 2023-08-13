import { useState } from 'react';
import { IUserOnChange } from '../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUserError, selectUserError } from '../redux/reducers/user';
import { userValidationChange } from '../utils/validations/userValidation';


const useUserOnChange: IUserOnChange.UseUserOnChangeProps = (initialState) => {
  const dispatch = useAppDispatch();
  const errorBack = useAppSelector(selectUserError)
  const [change, setChange] = useState<IUserOnChange.UseUserOnChange>(initialState)

  const handleErrorOnBack: IUserOnChange.HandleUserErrorOnBackProps = () => {
    if (errorBack) Object.entries(errorBack).forEach(([nameBack, valueBack]) => {
      setChange(prevState => { return ({ ...prevState, [nameBack]: { ...prevState[nameBack], message: valueBack } }) })
    })
  };

  const handleOnChange: IUserOnChange.HandleUserOnChangeProps = ({ name, value }) => {
    if (errorBack) dispatch(clearUserError());
    const { message, stop } = userValidationChange({ name: name, value, change })
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



