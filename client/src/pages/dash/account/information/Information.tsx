import { useContext, useState } from 'react';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/Input/Input';
import Spinner from '../../../../components/common/spinner';
import { CreateContext, IContextData } from '../../../../hooks/useContext';
import useMutationUser from '../../../../hooks/useMutationUser';
import useValidations from '../../../../hooks/useValidations/useValidations';
import { HandleChangeText } from '../../../../interfaces/global.interface';
import { IUser, TypeDashboard } from '../../../../interfaces/user.interface';
import { RequestMapUser, RouteUser } from '../../../../services/user/userRequest';
import Render from './Render';

export enum AccountInfoButtonName {
  Save = 'save',
}
export interface InitialStateAccountInfo {
  change: RequestMapUser[RouteUser.AccountInfo]['requestData']
  error: RequestMapUser[RouteUser.AccountInfo]['requestData']
}

function Information() {
  const { dashboard: { dispatchDashboard, stateDashboard: { account, login } } }: IContextData = useContext(CreateContext)!
  const { tools } = useMutationUser();
  const { getValidationErrors } = useValidations();

  const initialStateAccountInfo: InitialStateAccountInfo = {
    change: { user_id: login.user.user_id || "", name: login.user.name || "", lastName: login.user.lastName || "", email: login.user.email || "", newEmail: login.user.email || "", phone: login.user.phone || "" },
    error: { user_id: "", name: "", lastName: "", email: "", newEmail: "", phone: "" },
  }
  const [stateAccountInfo, setStateAccountInfo] = useState<InitialStateAccountInfo>(initialStateAccountInfo);

  const handleChangeAccountInfo: HandleChangeText = ({ target: { name, value } }) => {
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateAccountInfo(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateAccountInfo(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  return (
    <div className='account-information'>
      <div className='account-information__header'>
        <h4>Información personal</h4>
        <Button button={{ type: account === "information" ? 'dark' : 'light', text: 'Editar', disabled: account === 'password' || login.isLoading, handleClick: () => dispatchDashboard({ type: TypeDashboard.DASHBOARD_ACCOUNT, payload: account === 'information' ? '' : 'information' }) }} />
      </div>

      <main className='account-information__main'>
        {account !== "information" ? <Render /> :
          <div className='account-information__main-'>
            <div className="account-information__main-form">

              {(Object.keys(stateAccountInfo.change).filter(key => !['user_id', 'email'].includes(key)) as (keyof Omit<InitialStateAccountInfo['change'], 'email' | 'user_id'>)[]).map((item) => (
                <Input
                  key={item}
                  svg={{ type: item }}
                  styleClass={`login__account-info--${item}`}
                  errorMessage={stateAccountInfo.error[item] || login.errors.find(e => e.field === item)?.message}
                  input={{ type: item, placeholder: item === 'name' ? 'Nombres' : item === 'lastName' ? 'Apellidos' : item === 'newEmail' ? 'Ingrese su nuevo correo' : 'Teléfono', value: stateAccountInfo.change[item], handleOnChange: handleChangeAccountInfo, name: item }}
                />
              ))}

            </div>

            <div className="account-information__main-button">
              <Button button={{
                type: 'dark',
                text: login.isLoading ? <Spinner /> : 'Guardar',
                disabled: login.isLoading || compareUserAndAccount(login.user, stateAccountInfo.change),
                handleClick: () => tools.fetch(RouteUser.AccountInfo).options({ requestData: stateAccountInfo.change })
              }} />

            </div>
          </div>
        }
      </main>
    </div>
  );
}

export default Information;



function compareUserAndAccount(user: IUser.UserData, stateAccountInfo: InitialStateAccountInfo['change']): boolean {
  // Verificar que los IDs de usuario sean iguales
  if (user.user_id !== stateAccountInfo.user_id) {
    return false;
  }

  // Verificar que los campos específicos sean iguales o hayan cambiado
  if (user.name !== stateAccountInfo.name ||
    user.lastName !== stateAccountInfo.lastName ||
    user.email !== stateAccountInfo.email ||
    user.phone !== stateAccountInfo.phone) {
    return false;
  }

  // Verificar si el campo newEmail está presente en stateAccountInfo y es diferente
  if (stateAccountInfo.newEmail !== undefined && stateAccountInfo.newEmail !== user.email) {
    return false;
  }

  // Si no se encontraron diferencias, entonces los objetos son iguales o tienen la misma información
  return true;
}