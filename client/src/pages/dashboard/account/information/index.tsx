import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../components/hooks/useContext';
import { ActionTypeDashboard } from '../../../../components/hooks/useContext/dashboard/reducer';
import useOnChange from '../../../../components/hooks/useOnChange';
import { IOnChange } from '../../../../interfaces/onChange.interface';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData, selectUserError, selectUserLoading } from '../../../../redux/reducers/user';
import Form from './Form';
import Render from './Render';
import { IContextData } from '../../../../interfaces/context.interface';


function Information() {
  const dataUser = useAppSelector(selectUserData)!
  const initialState: IOnChange.UseOnChange = {
    name: { change: dataUser?.name, message: "" },
    lastName: { change: dataUser?.lastName, message: "" },
    email: { change: dataUser?.email, message: "" },
    phone: { change: dataUser?.phone, message: "" },
    _id: { change: dataUser?._id, message: "" },
  }
  const { dashboard: { state: { account: { password, information } }, dispatch } }: IContextData = useContext(CreateContext)!
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");

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

