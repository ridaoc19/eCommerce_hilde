import { useEffect, useState } from 'react';
import useOnChange, { PropsUseChange } from '../../../components/hooks/useOnChange';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from './Form';
import Loading from './Loading';
import Success from './Success';

const initialState: PropsUseChange = {
  name: { change: "", message: "" },
  lastName: { change: "", message: "" },
  email: { change: "", message: "" },
  // password: { change: "", message: "" },
  // confirmPassword: { change: "", message: "" },
}

function Registre() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const dispatch = useAppDispatch()
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  useEffect(() => {
    if (loadingUser) return setStatus("loading")
    if (errorBack instanceof Object) handleErrorOnBack({ errorBack })
    if (errorBack) return setStatus("form")
    if (dataUser instanceof Object && !loadingUser && !errorBack) return setStatus("success")
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])


  switch (status) {
    case "loading":
      return <Loading />
    case "success":
      return <Success />
    default:
      return <Form change={change} errorBack={errorBack} handleOnChange={handleOnChange} />
  }

}

export default Registre;

