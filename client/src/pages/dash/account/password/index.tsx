import { useContext, useEffect, useState } from 'react';
import { CreateContext, IContextData } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { HandleChangeText, HandleClick, clearUserError, useMutationUser, useNavigate, useValidations } from '../../../auth/login';
import FormAccountPass from './FormAccountPass';
import Render from './Render';
import { RequestMapUser, RouteUser } from '../../../../services/user/userRequest';

export enum AccountPassButtonName {
  Save = 'save',
}
export interface InitialStateAccountPass {
  change: RequestMapUser[RouteUser.AccountPass]['requestData']
  error: RequestMapUser[RouteUser.AccountPass]['requestData']
}

function Information() {
  const navigate = useNavigate()
  const { dashboard: { state: { account: { password, information } }, dispatch: dispatchContext } }: IContextData = useContext(CreateContext)!
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData, userQueryData } = getUserQueryData()
  const { getValidationErrors } = useValidations();
  const [success, setSuccess] = useState(false)

  const initialStateAccountPass: InitialStateAccountPass = {
    change: { user_id: userData?.user_id || "", password: "", newPassword: "" },
    error: { user_id: "", password: "", newPassword: "" },
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
    // eslint-disable-next-line
  }, [status.isUserSuccess])

  const handleChangeAccountPass: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateAccountPass(state), initialStateAccountPass, stateAccountPass)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateAccountPass(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateAccountPass(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
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
      </main>
    </>
  );
}

export default Information;

