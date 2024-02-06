
import { HandleChangeText, HandleClick, InitialStateRegistre, Input, RegistreButtonName, RouteUser, Spinner, Success, Svg, clearUserError, initialStateRegistre, useEffect, useMutationUser, useNavigate, useState, useValidations } from './index';

function Registre() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData } = getUserQueryData()
  const [stateRegistre, setStateRegistre] = useState<InitialStateRegistre>(initialStateRegistre);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (userData) setSuccess(true)
    // eslint-disable-next-line
  }, [status.isUserSuccess])

  const handleChangeRegistre: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateRegistre(state), initialStateRegistre, stateRegistre)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateRegistre(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateRegistre(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickRegistre: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as RegistreButtonName;
    if (id === RegistreButtonName.Back) return navigate('/');
    tools.fetch(RouteUser.Registre).options({ requestData: stateRegistre.change })
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
                  <Input
                    key={item}
                    svg={{ type: item === 'name' || item === 'lastName' ? 'user' : item }}
                    styleClass={`login--${item}`}
                    errorMessage={stateRegistre.error[item] || status.userError?.errors.find(e => e.field === item)?.message}
                    input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'email' ? 'Correo Electrónico' : 'Teléfono', value: stateRegistre.change[item], handleOnChange: handleChangeRegistre, name: item }}
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
                {Object.values(RegistreButtonName).map(item => (
                  <button
                    key={item}
                    id={`button__registre--${item}`}
                    onClick={handleClickRegistre}
                    className={item === RegistreButtonName.Back ? 'button_light' : 'button_dark'}
                    disabled={(status.isLoadingUser || RegistreButtonName.Save) && status.isUserError} >
                    {item === RegistreButtonName.Save ? (<>{status.isLoadingUser ? <Spinner /> : 'Crear Usuario'}</>) : (<>{'Volver'}</>)}
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

