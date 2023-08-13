import { useEffect, useState } from 'react';
import useUserOnChange from '../../../hooks/useUserOnChange';
import { IUserComponents, IUserOnChange } from '../../../interfaces/user.interface';
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from './Form';
import Success from './Success';

const initialState: IUserOnChange.UseUserOnChange = {
  name: { change: "", message: "" },
  lastName: { change: "", message: "" },
  email: { change: "", message: "" },
  phone: { change: "", message: "" },
}

function Registre() {
  const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && !localStorage.token) return setStatus("success")
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])


  switch (status) {
    case "success":
      return <Success />
    default:
      return <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />

  }

}

export default Registre;

