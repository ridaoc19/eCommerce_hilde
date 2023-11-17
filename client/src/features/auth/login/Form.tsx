import { InitialStateLogin, LoginButtonName } from '.';
import Svg from '../../../assets/icons/Svg';
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { Error } from '../../../services/userApi';

interface FormLoginProps {
  handleChangeLogin: HandleChangeText;
  stateLogin: InitialStateLogin;
  handleClickLogin: HandleClick;
  statusUserMutations: {
    isLoadingUser: boolean;
    errorUser: Error | null;
    isErrorUser: boolean;
  };
}


function Form({ handleChangeLogin, stateLogin: { change, error }, handleClickLogin, statusUserMutations }: FormLoginProps) {
  const { errorUser, isErrorUser, isLoadingUser } = statusUserMutations;

  return (
    <div className="login__form--container">
      <div className="login__form--content">

        <header className="form__header--content">
          {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tus datos para iniciar sesión</p>
        </header>

        <main>
          <div className="form__input--content">
            {(Object.keys(change) as (keyof InitialStateLogin['change'])[]).map((item) => (
              <UserInput
                key={item}
                svg={{ type: item === 'password' ? 'padlock' : item }}
                svgTwo={{ type: item === 'password' ? "eye" : "" }}
                styleClass={`login--${item}`}
                errorMessage={error[item] || errorUser?.errors.find(e => e.field === item)?.message}
                input={{ type: item, placeholder: item === 'email' ? "Correo electrónico" : "Contraseña", value: change[item], handleOnChange: handleChangeLogin, name: item }}
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
            {Object.values(LoginButtonName).map(item => (
              <button
                key={item}
                id={`button__login--${item}`}
                onClick={handleClickLogin}
                className={item === LoginButtonName.Reset ? "button_link" : item === LoginButtonName.Back ? 'button_light' : 'button_dark'}
                disabled={isLoadingUser || isErrorUser} >
                {item === LoginButtonName.Login ? (<>{statusUserMutations.isLoadingUser ? <Spinner /> : 'Iniciar Sesión'}</>)
                  : (<>{item === LoginButtonName.Reset ? 'Restablecer' : item === LoginButtonName.Registre ? 'Crear Cuenta' : 'Volver'}</>)}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;