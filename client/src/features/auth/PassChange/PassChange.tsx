
import { RouteUser, Svg, useEffect, Spinner, Success, UserInput, clearUserError, useMutationUser, useNavigate, useState, useValidations, InitialStateChange, HandleChangeText, HandleClick, ChangeButtonName } from './index';

function PassChange() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { fetchUserMutation: { fetch, removeError, getQueryUser }, statusUserMutation: { errorUser, isErrorUser, isLoadingUser, isSuccessUser } } = useMutationUser();
  const { dataUser } = getQueryUser()

  const initialStateChange: InitialStateChange = {
    change: { email: dataUser?.email || "", password: "", newPassword: "" },
    error: { email: "", password: "", newPassword: "" },
  }
  const [stateChange, setStateChange] = useState<InitialStateChange>(initialStateChange);
  const [success, setSuccess] = useState(false)
  console.log(dataUser)
  useEffect(() => {
    if (!dataUser) return navigate('/login')
    if (dataUser?.verified) setSuccess(true)
  }, [isSuccessUser])

  const handleChangeChange: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => removeError(), (state) => setStateChange(state), initialStateChange, stateChange)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateChange(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateChange(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickChange: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ChangeButtonName;
    if (id === ChangeButtonName.Back) return navigate('/login');
    fetch(RouteUser.Change).options({ requestData: stateChange.change })
  };

  return (
    <>
      {success ? <Success /> :
        <div className="pass-change__form--container">
          <div className="pass-change__form--content">

            <header className="form__header--content">
              {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
              <h2>Cambio de Contraseña</h2>
              <p>Cambia tu contraseña para acceder a tu cuenta</p>
            </header>

            <main>
              <div className="form__input--content">

                {(Object.keys(stateChange.change).filter(el => el !== 'email') as (keyof Omit<InitialStateChange['change'], 'email'>)[]).map((item) => (
                  <UserInput
                    key={item}
                    svg={{ type: "padlock" }}
                    svgTwo={{ type: "eye" }}
                    styleClass={`login__change--${item}`}
                    errorMessage={stateChange.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                    input={{ type: 'password', placeholder: item === 'password' ? 'Contraseña' : 'Confirmar contraseña', value: stateChange.change[item], handleOnChange: handleChangeChange, name: item }}
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
                {Object.values(ChangeButtonName).map(item => (
                  <button
                    key={item}
                    id={`button__change--${item}`}
                    onClick={handleClickChange}
                    className={item === ChangeButtonName.Back ? 'button_light' : 'button_dark'}
                    disabled={isLoadingUser || isErrorUser} >
                    {item === ChangeButtonName.Save ? (<>{isLoadingUser ? <Spinner /> : 'Cambiar contraseña'}</>) : (<>{'Volver'}</>)}
                  </button>
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

