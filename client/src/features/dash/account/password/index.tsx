import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { RequestMapUser, RouteUser } from '../../../../services/userRequest';
import { HandleChangeText, HandleClick, Spinner, UserInput, clearUserError, useMutationUser, useNavigate, useValidations } from '../../../auth/login';
import Render from './Render';
import Success from './Success';

export enum AccountPassButtonName {
  Save = 'save',
}
export interface InitialStateAccountPass {
  change: RequestMapUser[RouteUser.AccountPass]['requestData']
  error: RequestMapUser[RouteUser.AccountPass]['requestData']
}

function Information() {
  const navigate = useNavigate()
  const { dashboard: { state: { account: { password, information } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const { fetchUserMutation: { fetch, removeError, getQueryUser, removeFetch }, statusUserMutation: { dataSuccess, errorUser, isErrorUser, isLoadingUser, isSuccessUser } } = useMutationUser();
  const { dataUser } = getQueryUser()
  const { getValidationErrors } = useValidations();
  const [success, setSuccess] = useState(false)

  const initialStateAccountPass: InitialStateAccountPass = {
    change: { _id: dataUser?._id || "", password: "", newPassword: "" },
    error: { _id: "", password: "", newPassword: "" },
  }
  const [stateAccountPass, setStateAccountPass] = useState<InitialStateAccountPass>(initialStateAccountPass);

  useEffect(() => {

    if (dataSuccess?.field === "accountPass") {
      setSuccess(true)
    }
    setTimeout(() => {
      setSuccess(false)
      dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: { name: null, value: "" } })
      if (!dataUser?.verifiedEmail) {
        localStorage.removeItem("token");
        removeFetch()
        dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
        navigate('/')
      }
    }, 10000);
  }, [isSuccessUser])

  const handleChangeAccountPass: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => removeError(), (state) => setStateAccountPass(state), initialStateAccountPass, stateAccountPass)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateAccountPass(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateAccountPass(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickAccountPass: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as AccountPassButtonName;
    if (id === AccountPassButtonName.Save) {
      fetch(RouteUser.AccountPass).options({ requestData: stateAccountPass.change })
    }
  }


  const handleOnClick = () => {
    dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD, payload: { name: null, value: "" } })
  }

  return (
    <>
      <div>
        <h4>Cambio de contraseña</h4>
        <button className='button_light' onClick={handleOnClick} disabled={information || isLoadingUser}>Editar</button>
      </div>

      <main>
        {!password ? <Render /> :
          <div className="dashboard__user-form--container">
            <div className="dashboard__user-form--content">
              {success && <Success />}

              <main>

                <div className="user-form__input--content">
                  {(Object.keys(stateAccountPass.change).filter(key => !['_id'].includes(key)) as (keyof Omit<InitialStateAccountPass['change'], 'email' | '_id'>)[]).map((item) => (
                    <UserInput
                      key={item}
                      svg={{ type: 'padlock' }}
                      svgTwo={{ type: 'eye' }}
                      styleClass={`login__account-pass--${item}`}
                      errorMessage={stateAccountPass.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                      input={{ type: 'password', placeholder: item === 'password' ? 'nueva contraseña' : 'Confirma contraseña', value: stateAccountPass.change[item], handleOnChange: handleChangeAccountPass, name: item }}
                    />
                  ))}
                </div>

                <div className="form__error-back--content">
                  {errorUser?.errors.some(e => e.field === 'general') &&
                    <ul>
                      {errorUser?.errors.filter(e => e.field === 'general').map((e, i) => (
                        <span key={i}>{e.message}</span>
                      ))}
                    </ul>
                  }
                </div>

                <div className="form__button--content">
                  <button id='button__dashboard--save' onClick={handleClickAccountPass} className="button_dark" disabled={isLoadingUser || isErrorUser} >{isLoadingUser ? <Spinner /> : "Guardar nueva contraseña"}</button>
                </div>
              </main>
            </div>
          </div>
        }
      </main>
    </>
  );
}

export default Information;

