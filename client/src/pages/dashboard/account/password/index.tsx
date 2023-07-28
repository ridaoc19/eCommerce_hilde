import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../components/hooks/useContext';
import { ActionType } from '../../../../components/hooks/useContext/dashboard/reducer';
import useOnChange from '../../../../components/hooks/useOnChange';
import { IContextData } from '../../../../components/utils/interface/context';
import { IOnChange } from '../../../../interfaces/onChange.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData, selectUserError, selectUserLoading } from '../../../../redux/reducers/user';
import Form from './Form';
import Render from './Render';

function Password() {
  const dataUser = useAppSelector(selectUserData)!
  const initialState: IOnChange.UseOnChange = {
    password: { change: "", message: "" },
    confirmPassword: { change: "", message: "" },
    _id: { change: dataUser._id, message: "" },
  }
  const { dashboard: { state: { account: { information, password } }, dispatch } }: IContextData = useContext(CreateContext)!
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const [status, setStatus] = useState<"formP" | "loadingP" | "successP" | "errorP">("formP");

  useEffect(() => {
    if (information) return
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("errorP")
    if (loadingUser) return setStatus("loadingP")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.components === "password") {
      setStatus("successP")
      setTimeout(() => {
        setStatus("formP")
        dispatch({ type: ActionType.ACCOUNT_TOGGLE_PASSWORD })
      }, 10000);
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])

  const handleOnClick = () => {
    dispatch({ type: ActionType.ACCOUNT_TOGGLE_PASSWORD })
  }

  return (
    <>
      <div>
        <h4>Cambio de contraseña</h4>
        <button className='button_light' onClick={handleOnClick} disabled={information || status === "loadingP" || status === "successP"}>Editar</button>
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

