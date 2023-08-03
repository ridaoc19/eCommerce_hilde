import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import useUserOnChange from '../../../../hooks/useUserOnChange';
import { IUserOnChange } from '../../../../interfaces/hooks/UserOnChange.interface';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData, selectUserError, selectUserLoading } from '../../../../redux/reducers/user';
import Form from './Form';
import Render from './Render';
import { IAuth } from '../../../../interfaces/features/auth/auth.interface';

function Password() {
  const dataUser = useAppSelector(selectUserData)!
  const initialState: IUserOnChange.UseUserOnChange = {
    password: { change: "", message: "" },
    confirmPassword: { change: "", message: "" },
    _id: { change: dataUser._id, message: "" },
  }
  const { dashboard: { state: { account: { information, password } }, dispatch } }: IContext.IContextData = useContext(CreateContext)!
  const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const [status, setStatus] = useState<IAuth.Status>("form");

  useEffect(() => {
    if (information) return
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.components === "password") {
      setStatus("success")
      setTimeout(() => {
        setStatus("form")
        dispatch({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: "" })
      }, 10000);
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])

  const handleOnClick = () => {
    dispatch({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: "" })
  }

  return (
    <>
      <div>
        <h4>Cambio de contraseña</h4>
        <button className='button_light' onClick={handleOnClick} disabled={information || status === "loading" || status === "success"}>Editar</button>
      </div>

      <main>
        {password
          ? <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
          : <Render />}
      </main>
    </>
  );
}

export default Password;

