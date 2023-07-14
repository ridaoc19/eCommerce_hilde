import { useEffect, useState } from "react";
import Form from "./Form";
import Loading from "./Loading";
import Success from "./Success";
import useOnChange from "../../../components/hooks/useOnChange";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import PasswordChange from "./PasswordChange";

const initialState = {
  email: { change: "", message: "" },
  password: { change: "", message: "" },
}

function Login() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const dispatch = useAppDispatch()
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success" | "change">("form");

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
    case "change":
      return <PasswordChange />
    default:
      return <Form change={change} handleOnChange={handleOnChange} />
  }
}

export default Login;

