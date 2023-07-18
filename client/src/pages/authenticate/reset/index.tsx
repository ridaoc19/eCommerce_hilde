import { useEffect, useState } from "react";
import useOnChange from "../../../components/hooks/useOnChange";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from "./Form";
import Loading from "./Loading";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: { change: "", message: "" },
}

function Reset() {
  const navigate = useNavigate();
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  useEffect(() => {
    // if (!dataUser && !loadingUser) return navigate('/login')
    if (loadingUser) return setStatus("loading")
    if (errorBack instanceof Object) handleErrorOnBack({ errorBack })
    if (errorBack) return setStatus("form")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.verified) return setStatus("success")
    setStatus("form")
    // if (dataUser instanceof Object && !loadingUser && !errorBack) return setStatus("success")
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

export default Reset;

