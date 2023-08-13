import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import useUserOnChange from '../../../../hooks/useUserOnChange';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { IUserComponents, IUserOnChange } from '../../../../interfaces/user.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData, selectUserError, selectUserLoading } from '../../../../redux/reducers/user';
import Form from './Form';
import Render from './Render';


function Information() {
  const dataUser = useAppSelector(selectUserData)!
  const initialState: IUserOnChange.UseUserOnChange = {
    name: { change: dataUser?.name, message: "" },
    lastName: { change: dataUser?.lastName, message: "" },
    email: { change: dataUser?.email, message: "" },
    phone: { change: dataUser?.phone, message: "" },
    _id: { change: dataUser?._id, message: "" },
  }
  const { dashboard: { state: { account: { password, information } }, dispatch } }: IContext.IContextData = useContext(CreateContext)!
  const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const [status, setStatus] = useState<IUserComponents.Status>("form");

  useEffect(() => {
    if (password) return
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.components === "information") {
      setStatus("success")
      setTimeout(() => {
        setStatus("form")
        dispatch({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: "" })
      }, 10000);
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])

  const handleOnClick = () => {
    dispatch({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: "" })
  }

  return (
    <>
      <div>
        <h4>Información personal</h4>
        <button className='button_light' onClick={handleOnClick} disabled={password || status === "loading" || status === "success"} >Editar</button>
      </div>

      <main>
        {information
          ? <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
          : <Render />}
      </main>
    </>
  );
}

export default Information;

