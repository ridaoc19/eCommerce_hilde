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
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData, userQueryData } = getUserQueryData()
  const { getValidationErrors } = useValidations();
  const [success, setSuccess] = useState(false)

  const initialStateAccountInfo: InitialStateAccountInfo = {
    change: { _id: userData?._id || "", name: userData?.name || "", lastName: userData?.lastName || "", email: userData?.email || "", newEmail: userData?.email || "", phone: userData?.phone || "" },
    error: { _id: "", name: "", lastName: "", email: "", newEmail: "", phone: "" },
  }
  const [stateAccountInfo, setStateAccountInfo] = useState<InitialStateAccountInfo>(initialStateAccountInfo);

  useEffect(() => {

    if (userQueryData?.field === "accountInfo") {
      setSuccess(true)
    }
    setTimeout(() => {
      setSuccess(false)
      dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: { name: null, value: "" } })
      if (!userData?.verifiedEmail) {
        localStorage.removeItem("token");
        tools.removeQuery()
        // dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
        navigate('/')
      }
    }, 10000);
  }, [status.isUserSuccess])

  const handleChangeAccountInfo: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateAccountInfo(state), initialStateAccountInfo, stateAccountInfo)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateAccountInfo(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateAccountInfo(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickAccountInfo: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as AccountInfoButtonName;
    if (id === AccountInfoButtonName.Save) {
      tools.fetch(RouteUser.AccountInfo).options({ requestData: stateAccountInfo.change })
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
          disabled={password || status.isLoadingUser}
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
                      errorMessage={stateAccountInfo.error[item] || status.userError?.errors.find(e => e.field === item)?.message}
                      input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'newEmail' ? 'Ingrese su nuevo correo' : 'Teléfono', value: stateAccountInfo.change[item], handleOnChange: handleChangeAccountInfo, name: item }}
                    />
                  ))}

                </div>

                <div className="form__error-back--content">
                  {status.userError?.errors.some(e => e.field === 'general') &&
                    <ul>
                      {status.userError?.errors.filter(e => e.field === 'general').map((e, i) => (
                        <span key={i}>{e.message}</span>
                      ))}
                    </ul>
                  }
                </div>

                <div className="form__button--content">
                  <button id='button__information--save' onClick={handleClickAccountInfo} className="button_dark" disabled={status.isLoadingUser || status.isUserError} >{status.isLoadingUser ? <Spinner /> : "Editar Usuario"}</button>
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

