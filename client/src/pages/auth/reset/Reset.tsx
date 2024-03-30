import { useContext, useState } from 'react';
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

export enum ResetButtonName {
  Save = 'save',
  Back = 'back',
}
interface InitialStateReset {
  change: RequestMapUser[RouteUser.Reset]['requestData']
  error: RequestMapUser[RouteUser.Reset]['requestData']
}

const initialStateReset: InitialStateReset = {
  change: { email: "" },
  error: { email: "" }
}

function Reset() {
  const navigate = useNavigate()
  const { getValidationErrors } = useValidations();
  const { tools } = useMutationUser();
  const { dashboard: { dispatchDashboard, stateDashboard: { login } } } = useContext(CreateContext)
  const [stateReset, setStateReset] = useState<InitialStateReset>(initialStateReset);

  const handleChangeReset: HandleChangeText = ({ target: { name, value } }) => {
    dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR, payload: { field: name } })
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateReset(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateReset(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickReset: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as ResetButtonName;
    if (id === ResetButtonName.Back) return navigate('/login');
    tools.fetch(RouteUser.Reset).options({ requestData: stateReset.change })
  };

  return (
    <>
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

            <div className="form__button--content">
              {Object.values(ResetButtonName).map(item => (
                <Button
                  key={item}
                  button={{
                    type: item === ResetButtonName.Back ? 'light' : 'dark',
                    text: item === ResetButtonName.Save ? (<>{login.isLoading ? <Spinner color='white' /> : 'Restablecer Contraseña'}</>) : (<>{'Volver'}</>),
                    handleClick: handleClickReset,
                    id: `button__reset--${item}`,
                    disabled: (login.isLoading)
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

