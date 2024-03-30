import { useContext, useState } from 'react';
import Message from '../../../../components/common/Message/Message';
import { CreateContext, IContextData } from '../../../../hooks/useContext';
import { RequestMapUser, RouteUser } from '../../../../services/user/userRequest';
import { HandleChangeText, HandleClick, Input, Spinner, useValidations } from '../../../auth/login';
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
  const { dashboard: { stateDashboard: { account, login } } }: IContextData = useContext(CreateContext)!
  // const { tools, data: { getUserQueryData }, status } = useMutationUser();
  // const { userData, userQueryData } = getUserQueryData()
  const { getValidationErrors } = useValidations();
  // const [success, setSuccess] = useState(false)

  const initialStateAccountInfo: InitialStateAccountInfo = {
    change: { user_id: login.user.user_id || "", name: login.user.name || "", lastName: login.user.lastName || "", email: login.user.email || "", newEmail: login.user.email || "", phone: login.user.phone || "" },
    error: { user_id: "", name: "", lastName: "", email: "", newEmail: "", phone: "" },
  }
  const [stateAccountInfo, setStateAccountInfo] = useState<InitialStateAccountInfo>(initialStateAccountInfo);


  // useEffect(() => {
  //   if (userQueryData?.field === "accountInfo") {
  //     setSuccess(true)
  //   }
  //   setTimeout(() => {
  //     setSuccess(false)
  //     dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: { name: null, value: "" } })
  //     if (!login.user.verifiedEmail) {
  //       localStorage.removeItem("token");
  //       tools.removeQuery()
  //       // dispatchContext({ type: ActionTypeDashboard.LOGOUT, payload: { name: null, value: "" } })
  //       navigate('/')
  //     }
  //   }, 10000);
  //   // eslint-disable-next-line
  // }, [status.isUserSuccess])

  const handleChangeAccountInfo: HandleChangeText = ({ target: { name, value } }) => {
    // clearUserError(() => tools.resetError(), (state) => setStateAccountInfo(state), initialStateAccountInfo, stateAccountInfo)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateAccountInfo(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateAccountInfo(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickAccountInfo: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as AccountInfoButtonName;
    if (id === AccountInfoButtonName.Save) {
      // tools.fetch(RouteUser.AccountInfo).options({ requestData: stateAccountInfo.change })
    }
  }


  const handleOnClick = () => {
    // dispatchContext({ type: ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION, payload: { name: null, value: "" } })
  }

  return (
    <>
      <div>
        <button onClick={() => {
          // tools.resetError()
        }}>reset</button>
        <h4>Información personal</h4>
        <button className='button_light' onClick={handleOnClick}
          disabled={account === 'password' || login.isLoading}
        >Editar</button>
      </div>

      <main>
        {account !== "information" ? <Render /> :
          <div className="dashboard__user-form--container">
            <div className="dashboard__user-form--content">
              <Message open={false}>
                {/* <Message open={userQueryData?.field === "accountInfo"}> */}
                <Success />
              </Message>
              {/* {success && <Success />} */}

              <main>

                <div className="user-form__input--content">

                  {(Object.keys(stateAccountInfo.change).filter(key => !['user_id', 'email'].includes(key)) as (keyof Omit<InitialStateAccountInfo['change'], 'email' | 'user_id'>)[]).map((item) => (
                    <Input
                      key={item}
                      svg={{ type: item }}
                      styleClass={`login__account-info--${item}`}
                      errorMessage={stateAccountInfo.error[item] || login.errors.find(e => e.field === item)?.message}
                      input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'newEmail' ? 'Ingrese su nuevo correo' : 'Teléfono', value: stateAccountInfo.change[item], handleOnChange: handleChangeAccountInfo, name: item }}
                    />
                  ))}

                </div>

                <div className="form__error-back--content">
                  {login.errors.some(e => e.field === 'general') &&
                    <ul>
                      {login.errors.filter(e => e.field === 'general').map((e, i) => (
                        <span key={i}>{e.message}</span>
                      ))}
                    </ul>
                  }
                </div>

                <div className="form__button--content">
                  <button id='button__information--save' onClick={handleClickAccountInfo} className="button_dark" disabled={login.isLoading} >{login.isLoading ? <Spinner /> : "Editar Usuario"}</button>
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

