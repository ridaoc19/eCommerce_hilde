import { useContext, useState } from 'react';
import Button from '../../../../components/common/button/Button';
import { CreateContext, IContextData } from '../../../../hooks/useContext';
import useValidations from '../../../../hooks/useValidations/useValidations';
import { HandleChangeText } from '../../../../interfaces/global.interface';
import { TypeDashboard } from '../../../../interfaces/user.interface';
import { RequestMapUser, RouteUser } from '../../../../services/user/userRequest';
import FormAccountPass from './FormAccountPass';
import Render from './Render';

export enum AccountPassButtonName {
  Save = 'save',
}
export interface InitialStateAccountPass {
  change: RequestMapUser[RouteUser.AccountPass]['requestData']
  error: RequestMapUser[RouteUser.AccountPass]['requestData']
}

function Password() {
  const { dashboard: { dispatchDashboard, stateDashboard: { account, login } } }: IContextData = useContext(CreateContext)!
  const { getValidationErrors } = useValidations();

  const initialStateAccountPass: InitialStateAccountPass = {
    change: { user_id: login.user.user_id || "", password: "", newPassword: "" },
    error: { user_id: "", password: "", newPassword: "" },
  }
  const [stateAccountPass, setStateAccountPass] = useState<InitialStateAccountPass>(initialStateAccountPass);

  const handleChangeAccountPass: HandleChangeText = ({ target: { name, value } }) => {
    const { message, stop } = getValidationErrors({ name, value })
    if (stop) return setStateAccountPass(prevState => ({ ...prevState, error: { ...prevState.error, [name]: message } }))
    setStateAccountPass(prevState => ({ ...prevState, change: { ...prevState.change, [name]: value }, error: { ...prevState.error, [name]: message } }))
  }

  return (
    <div className='account-password'>
      <div className='account-password__header'>
        <h4>Cambio de contraseña</h4>
        <Button button={{ type: account === "password" ? 'dark' : 'light', text: 'Editar', disabled: account === 'information' || login.isLoading, handleClick: () => dispatchDashboard({ type: TypeDashboard.DASHBOARD_ACCOUNT, payload: account === 'password' ? '' : 'password' }) }} />
      </div>

      <main className='account-password__main'>
        {account !== "password" ? <Render /> :
          <FormAccountPass
            stateAccountPass={stateAccountPass}
            handleChangeAccountPass={handleChangeAccountPass}
          />
        }
      </main>
    </div>
  );
}

export default Password;

