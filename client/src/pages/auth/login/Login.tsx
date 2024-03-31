import { useContext, useState } from 'react';
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

export enum LoginButtonName {
  Reset = 'reset',
  Login = 'login',
  Registre = 'registre',
  Back = 'back',
}
interface InitialStateLogin {
  change: RequestMapUser[RouteUser.Login]['requestData']
  error: RequestMapUser[RouteUser.Login]['requestData']
}

const initialStateLogin: InitialStateLogin = {
  change: { email: "", password: "" },
  error: { email: "", password: "" }
}


function Login() {
  const { getValidationErrors } = useValidations();
  const { dashboard: { stateDashboard, clearUser, dispatchDashboard } } = useContext(CreateContext);
  const { login } = stateDashboard;
  const { tools } = useMutationUser();
  const [stateLogin, setStateLogin] = useState<InitialStateLogin>(initialStateLogin);

  const handleChangeLogin: HandleChangeText = ({ target: { name, value } }) => {
    dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR, payload: { field: name } })
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) {
      return setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))

    }
    setStateLogin(prevState => ({
      ...prevState,
      change: { ...prevState.change, [name]: value },
      error: { ...prevState.error, [name]: message }
    }))
  }

  const handleClickLogin: HandleClick = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login": return tools.fetch(RouteUser.Login).options({ requestData: stateLogin.change });
      case "reset": return clearUser({ pathname: '/reset' })
      case "registre": return clearUser({ pathname: '/registre' })
      case "back": return clearUser({ pathname: '/' })
      default: break;
    }
  };

  return (
    <div>
      <div className="login__form--container">
        <div className="login__form--content">

          <header className="form__header--content">
            {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
            <h2>¡Bienvenido!</h2>
            <p>Ingresa tus datos para iniciar sesión</p>
          </header>

          <main>
            <div className="form__input--content">
              {(Object.keys(stateLogin.change) as (keyof InitialStateLogin['change'])[]).map((item) => (
                <Input
                  key={item}
                  svg={{ type: item === 'password' ? 'padlock' : item }}
                  svgTwo={{ type: item === 'password' ? "eye" : "" }}
                  styleClass={`login--${item}`}
                  errorMessage={stateLogin.error[item] || login.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: item === 'email' ? "Correo electrónico" : "Contraseña", value: stateLogin.change[item], handleOnChange: handleChangeLogin, name: item }}
                />
              ))}
            </div>

            <div className="form__button--content">
              {Object.values(LoginButtonName).map(item => (
                <Button
                  key={item}
                  button={{
                    type: item === LoginButtonName.Reset ? "link" : item === LoginButtonName.Back ? 'light' : 'dark',
                    text: item === LoginButtonName.Login ? (<>{login.isLoading ? <Spinner color='white' /> : 'Iniciar Sesión'}</>)
                      : (<>{item === LoginButtonName.Reset ? 'Restablecer' : item === LoginButtonName.Registre ? 'Crear Cuenta' : 'Volver'}</>),
                    handleClick: handleClickLogin,
                    id: `button__login--${item}`,
                    disabled: login.isLoading
                    // disabled: (login.isLoading || item === LoginButtonName.Login) && login.errors.length > 0
                  }}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login;

