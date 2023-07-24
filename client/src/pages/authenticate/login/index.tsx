import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOnChange from "../../../components/hooks/useOnChange";
import { IOnChange } from "../../../components/utils/interface/onChange";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from "./Form";
import { CreateContext } from "../../../components/hooks/useContext";

const initialState: IOnChange.PropsUseChange = {
  email: { change: "", message: "" },
  password: { change: "", message: "" },
}

function Login() {
  // const {} = useContext(CreateContext)
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const navigate = useNavigate()
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");

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

