import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../components/assets/icons/Svg';
import Button from '../../../components/common/button/Button';
import Input from '../../../components/common/Input/Input';
import Spinner from '../../../components/common/spinner';
import { CreateContext } from '../../../hooks/useContext';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { TypeDashboard } from '../../../interfaces/user.interface';
import { RequestMapUser, RouteUser } from '../../../services/user/userRequest';

export enum ChangeButtonName {
  Save = 'save',
  Back = 'back',
}
export interface InitialStateChange {
  change: RequestMapUser[RouteUser.Change]['requestData']
  error: RequestMapUser[RouteUser.Change]['requestData']
}

function PassChange() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { dashboard: { dispatchDashboard, stateDashboard: { login }, clearUser } } = useContext(CreateContext)
  const { tools } = useMutationUser();
  // const { userData } = getUserQueryData();

  const initialStateChange: InitialStateChange = {
    change: { email: login.user?.email || "", password: "", newPassword: "" },
    error: { email: "", password: "", newPassword: "" },
  }
  const [stateChange, setStateChange] = useState<InitialStateChange>(initialStateChange);

  useEffect(() => {
    if (!login.user.email) return navigate('/login')
  }, [login])

  const handleChangeChange: HandleChangeText = ({ target: { name, value } }) => {
    dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR, payload: { field: name } })
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateChange(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateChange(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickChange: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ChangeButtonName;
    if (id === ChangeButtonName.Back) return clearUser({ pathname: '/login' });
    tools.fetch(RouteUser.Change).options({ requestData: stateChange.change })
  };

  return (
    <>
      {<div className="pass-change__form--container">
        <div className="pass-change__form--content">

          <header className="form__header--content">
            {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
            <h2>Cambio de Contraseña</h2>
            <p>Cambia tu contraseña para acceder a tu cuenta</p>
          </header>

          <main>
            <div className="form__input--content">

              {(Object.keys(stateChange.change).filter(el => el !== 'email') as (keyof Omit<InitialStateChange['change'], 'email'>)[]).map((item) => (
                <Input
                  key={item}
                  svg={{ type: "padlock" }}
                  svgTwo={{ type: "eye" }}
                  styleClass={`login__change--${item}`}
                  errorMessage={stateChange.error[item] || login?.errors.find(e => e.field === item)?.message}
                  input={{ type: 'password', placeholder: item === 'password' ? 'Contraseña' : 'Confirmar contraseña', value: stateChange.change[item], handleOnChange: handleChangeChange, name: item }}
                />
              ))}
            </div>

            <div className="form__error-back--content">
              {login?.errors.some(e => e.field === 'general') &&
                <ul>
                  {login?.errors.filter(e => e.field === 'general').map((e, i) => (
                    <span key={i}>{e.message}</span>
                  ))}
                </ul>
              }
            </div>

            <div className="form__button--content">
              {Object.values(ChangeButtonName).map(item => (
                <Button
                  key={item}
                  button={{
                    type: item === ChangeButtonName.Back ? 'light' : 'dark',
                    text: item === ChangeButtonName.Save ? (<>{login.isLoading ? <Spinner color='white' /> : 'Cambiar contraseña'}</>) : (<>{'Volver'}</>),
                    handleClick: handleClickChange,
                    id: `button__change--${item}`,
                    disabled: login.isLoading
                  }}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      }
    </>
  )
}

export default PassChange;

