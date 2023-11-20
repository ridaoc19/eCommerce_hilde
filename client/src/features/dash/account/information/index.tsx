import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../../../../hooks/useContext';
import { ActionTypeDashboard } from '../../../../hooks/useContext/dash/reducer';
import { IContext } from '../../../../interfaces/hooks/context.interface';
import { RequestMapUser, RouteUser } from '../../../../services/userRequest';
import { HandleChangeText, HandleClick, Spinner, UserInput, clearUserError, useMutationUser, useNavigate, useValidations } from '../../../auth/login';
import Render from './Render';
import Success from './Success';

export enum AccountInfoButtonName {
  Save = 'save',
}
export interface InitialStateAccountInfo {
  change: RequestMapUser[RouteUser.AccountInfo]['requestData']
  error: RequestMapUser[RouteUser.AccountInfo]['requestData']
}

function Information() {
  const navigate = useNavigate()
  const { dashboard: { state: { account: { password, information } }, dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!
  const { fetchUserMutation: { fetch, removeError, getQueryUser, removeFetch }, statusUserMutation: { dataSuccess, errorUser, isErrorUser, isLoadingUser, isSuccessUser } } = useMutationUser();
  const { dataUser } = getQueryUser()
  const { getValidationErrors } = useValidations();
  const [success, setSuccess] = useState(false)

  const initialStateAccountInfo: InitialStateAccountInfo = {
    change: { _id: dataUser?._id || "", name: dataUser?.name || "", lastName: dataUser?.lastName || "", email: dataUser?.email || "", newEmail: dataUser?.email || "", phone: dataUser?.phone || "" },
    error: { _id: "", name: "", lastName: "", email: "", newEmail: "", phone: "" },
  }
  const [stateAccountInfo, setStateAccountInfo] = useState<InitialStateAccountInfo>(initialStateAccountInfo);

  useEffect(() => {

    if (dataSuccess?.field === "accountInfo") {
      setSuccess(true)
    }
    setTimeout(() => {
      setSuccess(false)
      dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: { name: null, value: "" } })
      if (!dataUser?.verifiedEmail) {
        localStorage.removeItem("token");
        removeFetch()
        dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
        navigate('/')
      }
    }, 10000);
  }, [isSuccessUser])

  const handleChangeAccountInfo: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => removeError(), (state) => setStateAccountInfo(state), initialStateAccountInfo, stateAccountInfo)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateAccountInfo(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateAccountInfo(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickAccountInfo: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as AccountInfoButtonName;
    if (id === AccountInfoButtonName.Save) {
      fetch(RouteUser.AccountInfo).options({ requestData: stateAccountInfo.change })
    }
  }


  const handleOnClick = () => {
    dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: { name: null, value: "" } })
  }

  return (
    <>
      <div>
        <h4>Información personal</h4>
        <button className='button_light' onClick={handleOnClick}
          disabled={password || isLoadingUser}
        >Editar</button>
      </div>

      <main>
        {!information ? <Render /> :
          <div className="dashboard__user-form--container">
            <div className="dashboard__user-form--content">
              {success && <Success />}

              <main>

                <div className="user-form__input--content">

                  {(Object.keys(stateAccountInfo.change).filter(key => !['_id', 'email'].includes(key)) as (keyof Omit<InitialStateAccountInfo['change'], 'email' | '_id'>)[]).map((item) => (
                    <UserInput
                      key={item}
                      svg={{ type: item }}
                      styleClass={`login__account-info--${item}`}
                      errorMessage={stateAccountInfo.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                      input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'newEmail' ? 'Ingrese su nuevo correo' : 'Teléfono', value: stateAccountInfo.change[item], handleOnChange: handleChangeAccountInfo, name: item }}
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
                  <button id='button__dashboard--save' onClick={handleClickAccountInfo} className="button_dark" disabled={isLoadingUser || isErrorUser} >{isLoadingUser ? <Spinner /> : "Editar Usuario"}</button>
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

