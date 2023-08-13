import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOnChange from "../../../hooks/useUserOnChange";
import { IUserComponents, IUserOnChange } from "../../../interfaces/user.interface";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from "./Form";

const initialState: IUserOnChange.UseUserOnChange = {
  email: { change: "", message: "" },
  password: { change: "", message: "" },
}

function Login() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const navigate = useNavigate()
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && !localStorage.token) {
      if (dataUser?.verified) {
        setStatus("success")
        setTimeout(() => {
          return navigate('/')
        }, 10000);
        localStorage.token = dataUser.token;
      } else {
        return navigate('/change');
      }
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])

  return <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
}

export default Login;

