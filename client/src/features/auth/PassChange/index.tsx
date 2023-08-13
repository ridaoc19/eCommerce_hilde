import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserOnChange from "../../../hooks/useUserOnChange";
import { IUserComponents, IUserOnChange } from "../../../interfaces/user.interface";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from "./Form";
import Success from "./Success";

const initialState: IUserOnChange.UseUserOnChange = {
  password: { change: "", message: "" },
  confirmPassword: { change: "", message: "" },
}

function PassChange() {
  const navigate = useNavigate();
  const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (!dataUser && !loadingUser) return navigate('/login')
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.verified) return setStatus("success")
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])


  switch (status) {
    case "success":
      return <Success />
    default:
      return <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
  }
}

export default PassChange;

