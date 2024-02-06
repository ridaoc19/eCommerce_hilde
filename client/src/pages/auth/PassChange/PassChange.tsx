
import Button from '../../../components/common/button/Button';
import { ChangeButtonName, HandleChangeText, HandleClick, InitialStateChange, Input, RouteUser, Spinner, Success, Svg, clearUserError, useEffect, useMutationUser, useNavigate, useState, useValidations } from './index';

function PassChange() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { tools, data: { getUserQueryData }, status } = useMutationUser();
  const { userData } = getUserQueryData();

  const initialStateChange: InitialStateChange = {
    change: { email: userData?.email || "", password: "", newPassword: "" },
    error: { email: "", password: "", newPassword: "" },
  }
  const [stateChange, setStateChange] = useState<InitialStateChange>(initialStateChange);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!userData) return navigate('/login')
    if (userData?.verified) setSuccess(true)
    // eslint-disable-next-line
  }, [status.isUserSuccess])

  const handleChangeChange: HandleChangeText = ({ target: { name, value } }) => {
    clearUserError(() => tools.resetError(), (state) => setStateChange(state), initialStateChange, stateChange)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateChange(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateChange(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickChange: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ChangeButtonName;
    if (id === ChangeButtonName.Back) return navigate('/login');
    tools.fetch(RouteUser.Change).options({ requestData: stateChange.change })
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
                  <Input
                    key={item}
                    svg={{ type: "padlock" }}
                    svgTwo={{ type: "eye" }}
                    styleClass={`login__change--${item}`}
                    errorMessage={stateChange.error[item] || status.userError?.errors.find(e => e.field === item)?.message}
                    input={{ type: 'password', placeholder: item === 'password' ? 'Contraseña' : 'Confirmar contraseña', value: stateChange.change[item], handleOnChange: handleChangeChange, name: item }}
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
                {Object.values(ChangeButtonName).map(item => (
                  <Button
                    key={item}
                    button={{
                      type: item === ChangeButtonName.Back ? 'light' : 'dark',
                      text: item === ChangeButtonName.Save ? (<>{status.isLoadingUser ? <Spinner color='white' /> : 'Cambiar contraseña'}</>) : (<>{'Volver'}</>),
                      handleClick: handleClickChange,
                      id: `button__change--${item}`,
                      disabled: (status.isLoadingUser || ChangeButtonName.Save) && status.isUserError
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

