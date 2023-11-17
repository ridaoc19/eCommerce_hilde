
import { RouteUser, Svg, useEffect, Spinner, Success, UserInput, clearUserError, useMutationUser, useNavigate, useState, useValidations, InitialStateRegistre, initialStateRegistre, HandleChangeText, HandleClick, RegistreButtonName } from './index';

function Registre() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { fetchUserMutation: { fetch, removeError }, statusUserMutation: { errorUser, isErrorUser, isLoadingUser, isSuccessUser, dataUser } } = useMutationUser();
  const [stateRegistre, setStateRegistre] = useState<InitialStateRegistre>(initialStateRegistre);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (dataUser) setSuccess(true)
  }, [isSuccessUser])

  const handleChangeRegistre: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => removeError(), (state) => setStateRegistre(state), initialStateRegistre, stateRegistre)
    const { error, stop } = getValidationErrors({ fieldName: name, value })
    if (stop) return setStateRegistre(prevState => ({ ...prevState, error: { ...prevState.error, [name]: error } }))
    setStateRegistre(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: error } }))
  }

  const handleClickRegistre: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as RegistreButtonName;
    if (id === RegistreButtonName.Back) return navigate('/');
    fetch(RouteUser.Registre).options({ requestData: stateRegistre.change })
  };

  return (
    <>
      {success ? <Success /> :
        <div className="registre__form--container">
          <div className="registre__form--content">

            <header className="form__header--content">
              {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
              <h2>Regístrate</h2>
              <p>Ingresa tus datos personales para crear tu cuenta</p>
            </header>

            <main>
              <div className="form__input--content">

                {(Object.keys(stateRegistre.change) as (keyof InitialStateRegistre['change'])[]).map((item) => (
                  <UserInput
                    key={item}
                    svg={{ type: item === 'name' || item === 'lastName' ? 'user' : item }}
                    styleClass={`login--${item}`}
                    errorMessage={stateRegistre.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                    input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'email' ? 'Correo Electrónico' : 'Teléfono', value: stateRegistre.change[item], handleOnChange: handleChangeRegistre, name: item }}
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
                {Object.values(RegistreButtonName).map(item => (
                  <button
                    key={item}
                    id={`button__registre--${item}`}
                    onClick={handleClickRegistre}
                    className={item === RegistreButtonName.Back ? 'button_light' : 'button_dark'}
                    disabled={isLoadingUser || isErrorUser} >
                    {item === RegistreButtonName.Save ? (<>{isLoadingUser ? <Spinner /> : 'Crear Usuario'}</>) : (<>{'Volver'}</>)}
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

export default Registre;

