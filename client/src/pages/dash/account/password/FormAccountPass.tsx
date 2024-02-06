import { InitialStateAccountPass } from ".";
import { Error } from "../../../../services/user/userApi";
import { HandleChangeText, HandleClick, Input, Spinner } from "../../../auth/login";
import Success from "./Success";

interface FormAccountPassProps {
  success: boolean;
  stateAccountPass: InitialStateAccountPass;
  errorUser: Error | null;
  handleChangeAccountPass: HandleChangeText;
  handleClickAccountPass: HandleClick;
  isLoadingUser: boolean;
  isErrorUser: boolean;
}


function FormAccountPass({ stateAccountPass, success, errorUser, isErrorUser, isLoadingUser, handleChangeAccountPass, handleClickAccountPass }: FormAccountPassProps) {
  return (
    <div className="dashboard__user-form--container">
      <div className="dashboard__user-form--content">
        {success && <Success />}

        <main>

          <div className="user-form__input--content">
            {
            (Object.keys(stateAccountPass.change).filter(key => !['_id'].includes(key)) as (keyof Omit<InitialStateAccountPass['change'], 'email' | '_id'>)[]).map((item) => (
              <Input
                key={item}
                svg={{ type: 'padlock' }}
                svgTwo={{ type: 'eye' }}
                styleClass={`login__account-pass--${item}`}
                errorMessage={stateAccountPass.error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                input={{ type: 'password', placeholder: item === 'password' ? 'nueva contraseña' : 'Confirma contraseña', value: stateAccountPass.change[item], handleOnChange: handleChangeAccountPass, name: item }}
              />
            ))
            }
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
            <button id='button__dashboard--save' onClick={handleClickAccountPass} className="button_dark" disabled={isLoadingUser || isErrorUser} >{isLoadingUser ? <Spinner /> : "Guardar nueva contraseña"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FormAccountPass;