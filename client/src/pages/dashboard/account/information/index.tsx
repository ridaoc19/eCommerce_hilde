import { useEffect, useState, useContext } from 'react';
import useOnChange from '../../../../components/hooks/useOnChange';
import { IOnChange } from '../../../../components/utils/interface/onChange';
import { useAppSelector } from '../../../../redux/hooks';
import { selectUserData, selectUserError, selectUserLoading } from '../../../../redux/reducers/user';
import Form from './Form';
import Render from './Render';
import { IContextData } from '../../../../components/utils/interface/context';
import { CreateContext } from '../../../../components/hooks/useContext';
import { ActionType } from '../../../../components/hooks/useContext/dashboard/reducer';


function Information() {
  const dataUser = useAppSelector(selectUserData)!
  const initialState: IOnChange.PropsUseChange = {
    name: { change: dataUser?.name, message: "" },
    lastName: { change: dataUser?.lastName, message: "" },
    email: { change: dataUser?.email, message: "" },
    phone: { change: dataUser?.phone, message: "" },
    _id: { change: dataUser?._id, message: "" },
  }
  const { dashboard: { dispatch } }: IContextData = useContext(CreateContext)!
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const errorBack = useAppSelector(selectUserError)
  const loadingUser = useAppSelector(selectUserLoading)
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (errorBack instanceof Object) handleErrorOnBack()
    if (errorBack) return setStatus("error")
    if (loadingUser) return setStatus("loading")
    if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.components === "information"){
      setStatus("success")
      setTimeout(() => {
        setEdit(!edit)
        setStatus("form")
      }, 10000);
    }
    // eslint-disable-next-line
  }, [loadingUser, dataUser, errorBack])

  const handleOnClick = () => {
    setEdit(!edit)
    dispatch({ type: ActionType.TOGGLE_ACCOUNT , payload: "information" })
  }

  return (
    <>
      <div>
        <h4>Información personal</h4>
        <button onClick={handleOnClick} >Editar</button>
      </div>

      <main>
        {edit
          ? <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
          : <Render />}
      </main>
    </>
  );
}

export default Information;

