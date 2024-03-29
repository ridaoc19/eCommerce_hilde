
import { useContext } from 'react';
import Button from '../../../components/common/button/Button';
import { CreateContext } from '../../../hooks/useContext';
import { HandleChangeText, HandleClick, InitialStateReset, Input, ResetButtonName, Spinner, Success, Svg, initialStateReset, useEffect, useNavigate, useState, useValidations } from './index';

function Reset() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  // const { tools, data: { getUserQueryData }, status } = useMutationUser();
  // const { userData } = getUserQueryData();
  const { dashboard: { stateDashboard: { login } } } = useContext(CreateContext)
  const [stateReset, setStateReset] = useState<InitialStateReset>(initialStateReset);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (login.isLogin) {
      setSuccess(true)
      setTimeout(() => {
        // tools.removeQuery()
        return navigate('/login')
      }, 10000);
    }
    // eslint-disable-next-line
  }, [login.isSuccess])

  const handleChangeReset: HandleChangeText = ({ target: { name, value } }) => {
    // clearUserError(() => tools.resetError(), (state) => setStateReset(state), initialStateReset, stateReset)
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateReset(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateReset(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickReset: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ResetButtonName;
    if (id === ResetButtonName.Back) return navigate('/login');
    // tools.fetch(RouteUser.Reset).options({ requestData: stateReset.change })
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
                <Input
                  key={item}
                  svg={{ type: item }}
                  styleClass={`login__reset--${item}`}
                  errorMessage={stateReset.error[item] || login?.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: 'Correo electrónico', value: stateReset.change[item], handleOnChange: handleChangeReset, name: item }}
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
              {Object.values(ResetButtonName).map(item => (
                <Button
                  key={item}
                  button={{
                    type: item === ResetButtonName.Back ? 'light' : 'dark',
                    text: item === ResetButtonName.Save ? (<>{login.isLoading ? <Spinner color='white' /> : 'Restablecer Contraseña'}</>) : (<>{'Volver'}</>),
                    handleClick: handleClickReset,
                    id: `button__reset--${item}`,
                    disabled: (login.isLoading || item === ResetButtonName.Save) && login.isError
                  }}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Reset;

