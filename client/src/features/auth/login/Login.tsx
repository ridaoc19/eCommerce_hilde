import { RouteUser, Svg, useEffect, Spinner, Success, UserInput, clearUserError, useMutationUser, useNavigate, useState, useValidations, InitialStateLogin, initialStateLogin, HandleChangeText, HandleClick, LoginButtonName } from './index';

function Login() {
  const { getValidationErrors } = useValidations();
  const { fetchUserMutation, statusUserMutation } = useMutationUser();
  const { dataUser, isSuccessUser } = statusUserMutation;
  const [stateLogin, setStateLogin] = useState<InitialStateLogin>(initialStateLogin);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (dataUser) {
      if (dataUser.verified) {
        if (!dataUser.verifiedEmail) {
          setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, email: `${dataUser.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${dataUser.email}` } }))
        } else {
          setSuccess(true)
          localStorage.token = dataUser.token;
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
  }, [isSuccessUser])

  const handleChangeLogin: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => fetchUserMutation.removeError(), (state) => setStateLogin(state), initialStateLogin, stateLogin)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) {
      return setStateLogin(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))

    }
    setStateLogin(prevState => ({
      ...prevState,
      change: { ...prevState.change, [name]: value },
      error: { ...prevState.error, [name]: error }
    }))
  }

  const handleClickLogin: HandleClick = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login":
        fetchUserMutation.fetch(RouteUser.Login).options({ requestData: stateLogin.change })
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
                <UserInput
                  key={item}
                  svg={{ type: item === 'password' ? 'padlock' : item }}
                  svgTwo={{ type: item === 'password' ? "eye" : "" }}
                  styleClass={`login--${item}`}
                  errorMessage={stateLogin.error[item] || statusUserMutation.errorUser?.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: item === 'email' ? "Correo electrónico" : "Contraseña", value: stateLogin.change[item], handleOnChange: handleChangeLogin, name: item }}
                />
              ))}
            </div>

            <div className="form__error-back--content">
              {statusUserMutation.errorUser?.errors.some(e => e.field === 'general') &&
                <ul>
                  {statusUserMutation.errorUser?.errors.filter(e => e.field === 'general').map((e, i) => (
                    <span key={i}>{e.message}</span>
                  ))}
                </ul>
              }
            </div>

            <div className="form__button--content">
              {Object.values(LoginButtonName).map(item => (
                <button
                  key={item}
                  id={`button__login--${item}`}
                  onClick={handleClickLogin}
                  className={item === LoginButtonName.Reset ? "button_link" : item === LoginButtonName.Back ? 'button_light' : 'button_dark'}
                  disabled={statusUserMutation.isLoadingUser || statusUserMutation.isErrorUser} >
                  {item === LoginButtonName.Login ? (<>{statusUserMutation.isLoadingUser ? <Spinner /> : 'Iniciar Sesión'}</>)
                    : (<>{item === LoginButtonName.Reset ? 'Restablecer' : item === LoginButtonName.Registre ? 'Crear Cuenta' : 'Volver'}</>)}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login;

