import { useContext, useEffect, useState } from 'react';
import Svg from '../../../components/assets/icons/Svg';
import Button from '../../../components/common/button/Button';
import Input from '../../../components/common/Input/Input';
import Spinner from '../../../components/common/spinner';
import { CreateContext } from '../../../hooks/useContext';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { IUser, TypeDashboard } from '../../../interfaces/user.interface';
import { RouteUser } from '../../../services/user/userRequest';
import Success from './Success';

export enum RegistreButtonName {
  Save = 'save',
  Back = 'back',
}
export interface InitialStateRegistre {
  change: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'>
  error: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'>
}

const initialStateRegistre: InitialStateRegistre = {
  change: { name: "", lastName: "", email: "", phone: "", },
  error: { name: "", lastName: "", email: "", phone: "", },
}

function Registre() {
  const { getValidationErrors } = useValidations();
  const { dashboard: { stateDashboard: { login }, clearUser, dispatchDashboard } } = useContext(CreateContext)
  const { tools } = useMutationUser();
  const [stateRegistre, setStateRegistre] = useState<InitialStateRegistre>(initialStateRegistre);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (login.user.name) setSuccess(true)
    // eslint-disable-next-line
  }, [login.isSuccess])

  const handleChangeRegistre: HandleChangeText = ({ target: { name, value } }) => {
    dispatchDashboard({ type: TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR, payload: { field: name } })
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateRegistre(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateRegistre(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  const handleClickRegistre: HandleClick = (event) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.split("--")[1] as RegistreButtonName;
    if (id === RegistreButtonName.Back) return clearUser({ pathname: '/login' });
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
                    errorMessage={stateRegistre.error[item] || login?.errors.find(e => e.field === item)?.message}
                    input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'email' ? 'Correo Electrónico' : 'Teléfono', value: stateRegistre.change[item], handleOnChange: handleChangeRegistre, name: item }}
                  />
                ))}

              </div>

              <div className="form__button--content">
                {Object.values(RegistreButtonName).map(item => (
                  <Button
                    key={item}
                    button={{
                      type: item === RegistreButtonName.Back ? 'light' : 'dark',
                      text: item === RegistreButtonName.Save ? (<>{login.isLoading ? <Spinner color='white' /> : 'Crear Usuario'}</>) : (<>{'Volver'}</>),
                      handleClick: handleClickRegistre,
                      id: `button__registre--${item}`,
                      disabled: login.isLoading
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

export default Registre;

