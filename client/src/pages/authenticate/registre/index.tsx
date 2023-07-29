import { useEffect, useState } from 'react';
import useOnChange from '../../../components/hooks/useOnChange';
import { IOnChange } from '../../../interfaces/user/onChangeUser.interface';
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from './Form';
import Success from './Success';

const initialState: IOnChange.UseOnChange = {
  name: { change: "", message: "" },
  lastName: { change: "", message: "" },
  email: { change: "", message: "" },
  phone: { change: "", message: "" },
}

function Registre() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");

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

