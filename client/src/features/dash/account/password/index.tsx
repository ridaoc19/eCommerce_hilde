import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { RequestMapUser, RouteUser } from '../../../../services/userRequest';
import { HandleChangeText, HandleClick, clearUserError, useMutationUser, useNavigate, useValidations } from '../../../auth/login';
import AdminUser from './AdminUser/AdminUser';
import FormAccountPass from './FormAccountPass';
import Render from './Render';

export enum AccountPassButtonName {
  Save = 'save',
}
export interface InitialStateAccountPass {
  change: RequestMapUser[RouteUser.AccountPass]['requestData']
  error: RequestMapUser[RouteUser.AccountPass]['requestData']
}

function Information() {
  const navigate = useNavigate()
  const { dashboard: { state: { account: { password, information }, permits: { admin } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData, userQueryData } = getUserQueryData()
  const { getValidationErrors } = useValidations();
  const [success, setSuccess] = useState(false)

  const initialStateAccountPass: InitialStateAccountPass = {
    change: { _id: userData?._id || "", password: "", newPassword: "" },
    error: { _id: "", password: "", newPassword: "" },
  }
  const [stateAccountPass, setStateAccountPass] = useState<InitialStateAccountPass>(initialStateAccountPass);

  useEffect(() => {

    if (userQueryData?.field === "accountPass") {
      setSuccess(true)
    }
    setTimeout(() => {
      setSuccess(false)
      dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: { name: null, value: "" } })
      if (!userData?.verifiedEmail) {
        localStorage.removeItem("token");
        tools.removeQuery()
        dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
        navigate('/')
      }
    }, 10000);
  }, [status.isUserSuccess])

  const handleChangeAccountPass: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateAccountPass(state), initialStateAccountPass, stateAccountPass)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateAccountPass(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateAccountPass(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickAccountPass: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as AccountPassButtonName;
    if (id === AccountPassButtonName.Save) {
      tools.fetch(RouteUser.AccountPass).options({ requestData: stateAccountPass.change })
    }
  }


  const handleOnClick = () => {
    dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: { name: null, value: "" } })
  }

  return (
    <>
      <div>
        <h4>Cambio de contraseña</h4>
        <button className='button_light' onClick={handleOnClick} disabled={information || status.isLoadingUser}>Editar</button>
      </div>

      <main>
        {!password ? <Render /> :
          <FormAccountPass
            success={success}
            errorUser={status.userError}
            isErrorUser={status.isUserError}
            isLoadingUser={status.isLoadingUser}
            stateAccountPass={stateAccountPass}
            handleChangeAccountPass={handleChangeAccountPass}
            handleClickAccountPass={handleClickAccountPass} />
        }
        {admin && <AdminUser />}
      </main>
    </>
  );
}

export default Information;

