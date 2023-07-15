import { useEffect, useState } from "react";
import Form from "./Form";
import Loading from "./Loading";
import Success from "./Success";
import useOnChange from "../../../components/hooks/useOnChange";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import { useNavigate } from "react-router-dom";
// import PasswordChange from "./PasswordChange";

const initialState = {
  email: { change: "", message: "" },
  password: { change: "", message: "" },
}

function Login() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const navigate = useNavigate()
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  useEffect(() => {
    if (loadingUser) return setStatus("loading")
    if (errorBack instanceof Object) handleErrorOnBack({ errorBack })
    if (errorBack) return setStatus("form")
    console.log(dataUser)
    if (dataUser instanceof Object && !loadingUser && !errorBack) {
      if (dataUser?.state) {
        localStorage.token = dataUser.token;
        return navigate('/')
      }
      return navigate('/change');
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])


  switch (status) {
    case "loading":
      return <Loading />
    case "success":
      return <Success />
    default:
      return <Form change={change} handleOnChange={handleOnChange} />
  }
}

export default Login;

