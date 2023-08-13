import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserOnChange from "../../../hooks/useUserOnChange";
import { IUserComponents, IUserOnChange } from "../../../interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearUser, selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
import Form from "./Form";

const initialState: IUserOnChange.UseUserOnChange = {
  email: { change: "", message: "" },
}

function Reset() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const dataUser = useAppSelector(selectUserData)
  const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && !dataUser?.verified) {
      setStatus("success")
      setTimeout(() => {
        dispatch(clearUser());
        return navigate('/login')
      }, 10000);
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])


  return <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
}

export default Reset;

