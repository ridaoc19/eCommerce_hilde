import Button from '../../../components/common/button/Button';
import { RouteUser, Svg, useEffect, Spinner, Success, Input, clearUserError, useMutationUser, useNavigate, useState, useValidations, InitialStateLogin, initialStateLogin, HandleChangeText, HandleClick, LoginButtonName } from './index';

function Login() {
  const { getValidationErrors } = useValidations();
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData } = getUserQueryData()
  const [stateLogin, setStateLogin] = useState<InitialStateLogin>(initialStateLogin);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      if (userData.verified) {
        if (!userData.verifiedEmail) {
          setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, email: `${userData.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${userData.email}` } }))
          tools.removeQuery()
          localStorage.removeItem("token");
        } else {
          setSuccess(true)
          localStorage.token = userData.token;
        }
        setTimeout(() => {
          setSuccess(false)
          return navigate('/')
        }, 10000);
      } else {
        return navigate('/change');
      }
    }
    // eslint-disable-next-line
  }, [status.isUserSuccess])

  const handleChangeLogin: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateLogin(state), initialStateLogin, stateLogin)
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
      case "login":
        tools.fetch(RouteUser.Login).options({ requestData: stateLogin.change })
        return;
      case "reset":
        navigate('/reset');
        break;
      case "registre":
        navigate('/registre');
        break;
      case "back":
        navigate('/');
        break;
      default:
        break;;
    }
  };

  return (
    <div>
      {success && <Success />}
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
                  errorMessage={stateLogin.error[item] || status.userError?.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: item === 'email' ? "Correo electrónico" : "Contraseña", value: stateLogin.change[item], handleOnChange: handleChangeLogin, name: item }}
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
              {Object.values(LoginButtonName).map(item => (
                <Button
                  key={item}
                  button={{
                    type: item === LoginButtonName.Reset ? "link" : item === LoginButtonName.Back ? 'light' : 'dark',
                    text: item === LoginButtonName.Login ? (<>{status.isLoadingUser ? <Spinner color='white' /> : 'Iniciar Sesión'}</>)
                      : (<>{item === LoginButtonName.Reset ? 'Restablecer' : item === LoginButtonName.Registre ? 'Crear Cuenta' : 'Volver'}</>),
                    handleClick: handleClickLogin,
                    id: `button__login--${item}`,
                    disabled: (status.isLoadingUser || item === LoginButtonName.Login) && status.isUserError
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

