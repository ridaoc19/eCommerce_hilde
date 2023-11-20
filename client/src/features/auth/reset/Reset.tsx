
import { HandleChangeText, Svg, HandleClick, InitialStateReset, ResetButtonName, RouteUser, Spinner, Success, UserInput, clearUserError, initialStateReset, useEffect, useMutationUser, useNavigate, useState, useValidations } from './index';

function Reset() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { fetchUserMutation: { fetch, removeError, removeFetch }, statusUserMutation: { errorUser, isErrorUser, isLoadingUser, isSuccessUser, dataUser } } = useMutationUser();
  const [stateReset, setStateReset] = useState<InitialStateReset>(initialStateReset);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (dataUser) {
      setSuccess(true)
      setTimeout(() => {
        removeFetch()
        return navigate('/login')
      }, 10000);
    }
    // eslint-disable-next-line
  }, [isSuccessUser])

  const handleChangeReset: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => removeError(), (state) => setStateReset(state), initialStateReset, stateReset)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateReset(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateReset(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickReset: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ResetButtonName;
    if (id === ResetButtonName.Back) return navigate('/login');
    fetch(RouteUser.Reset).options({ requestData: stateReset.change })
  };

  return (
    <>
      {success && <Success />}
      <div className="reset__form--container">
        <div className="reset__form--content">

          <header className="form__header--content">
            {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
            <h2>Recuperar contraseña</h2>
            <p>Ingresa el correo electrónico que tienes registrado</p>
          </header>

          <main>
            <div className="form__input--content">

              {(Object.keys(stateReset.change) as (keyof InitialStateReset['change'])[]).map((item) => (
                <UserInput
                  key={item}
                  svg={{ type: item }}
                  styleClass={`login__reset--${item}`}
                  errorMessage={stateReset.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: 'Correo electrónico', value: stateReset.change[item], handleOnChange: handleChangeReset, name: item }}
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
              {Object.values(ResetButtonName).map(item => (
                <button
                  key={item}
                  id={`button__reset--${item}`}
                  onClick={handleClickReset}
                  className={item === ResetButtonName.Back ? 'button_light' : 'button_dark'}
                  disabled={isLoadingUser || item === ResetButtonName.Save && isErrorUser} >
                  {item === ResetButtonName.Save ? (<>{isLoadingUser ? <Spinner /> : 'Restablecer Contraseña'}</>) : (<>{'Volver'}</>)}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Reset;

