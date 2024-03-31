import { useContext } from "react";
import Button from "../../../../components/common/button/Button";
import Input from "../../../../components/common/Input/Input";
import Spinner from "../../../../components/common/spinner";
import { CreateContext } from "../../../../hooks/useContext";
import useMutationUser from "../../../../hooks/useMutationUser";
import { HandleChangeText } from "../../../../interfaces/global.interface";
import { InitialStateAccountPass } from "./Password";
import { RouteUser } from "../../../../services/user/userRequest";

interface FormAccountPassProps {
  stateAccountPass: InitialStateAccountPass;
  handleChangeAccountPass: HandleChangeText;
}


function FormAccountPass({ stateAccountPass, handleChangeAccountPass }: FormAccountPassProps) {
  const { dashboard: { stateDashboard: { login: { errors, isLoading } } } } = useContext(CreateContext)
  const { tools } = useMutationUser();

  return (
    <div className="account-password__main-">
      <div className="account-password__main-form">
        {
          (Object.keys(stateAccountPass.change).filter(key => !['user_id'].includes(key)) as (keyof Omit<InitialStateAccountPass['change'], 'email' | 'user_id'>)[]).map((item) => (
            <Input
              key={item}
              svg={{ type: 'padlock' }}
              svgTwo={{ type: 'eye' }}
              styleClass={`login__account-pass--${item}`}
              errorMessage={stateAccountPass.error[item] || errors?.find(e => e.field === item)?.message}
              input={{ type: 'password', placeholder: item === 'password' ? 'nueva contraseña' : 'Confirma contraseña', value: stateAccountPass.change[item], handleOnChange: handleChangeAccountPass, name: item }}
            />
          ))
        }
      </div>

      <div className="account-password__main-button">
        <Button button={{
          type: 'dark',
          text: isLoading ? <Spinner /> : 'Guardar',
          disabled: isLoading,
          handleClick: () => tools.fetch(RouteUser.AccountPass).options({ requestData: stateAccountPass.change })
        }} />
      </div>
    </div>
  );
}

export default FormAccountPass;