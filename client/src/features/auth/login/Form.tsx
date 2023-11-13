import { useEffect, useState } from 'react';
import { InitialStateLogin } from '.';
import Svg from '../../../assets/icons/Svg';
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../../redux/reducers/user';
import { Error, MakeUserRequestReturn } from '../../../services/userApi';

interface FormLoginProps {
  handleChangeLogin: HandleChangeText;
  stateLogin: InitialStateLogin;
  handleClickLogin: HandleClick;
  statusUserMutation: {
    dataUser: MakeUserRequestReturn | undefined;
    isLoadingUser: boolean;
    isSuccessUser: boolean;
    errorUser: Error | null;
    isErrorUser: boolean;
  };
}


function Form({ handleChangeLogin, stateLogin: { change, error }, handleClickLogin, statusUserMutation }: FormLoginProps) {
  const { email, password } = change;
  const [errorValidateEmail, setErrorValidateEmail] = useState("");
  const dataUser = useAppSelector(selectUserData)
  console.log(errorValidateEmail)
  useEffect(() => {
    if (dataUser && !dataUser?.verifiedEmail) {
      setErrorValidateEmail(`${dataUser.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${dataUser.email}`)
      setTimeout(() => {
        setErrorValidateEmail("")
      }, 10000);
    }
  }, [dataUser?.verifiedEmail])

  // const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   const id = (event.target as HTMLFormElement).id.split("--")[1];
  //   event.preventDefault();

  //   switch (id) {
  //     case "login":
  //       const { dataPost, authorize } = userValidationClick({ change, handleOnChange, routes: "login" })
  //       if (authorize) dispatch(userPosts(dataPost as IUser.LoginData));
  //       return;
  //     case "reset":
  //       navigate('/reset');
  //       break;
  //     case "registre":
  //       navigate('/registre');
  //       break;
  //     case "back":
  //       navigate('/');
  //       break;
  //     default:
  //       break;;
  //   }
  //   dispatch(clearUser());
  // };

  return (
    <div className="login__form--container">
      <div className="login__form--content">

        <header className="form__header--content">
          {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tus datos para iniciar sesión</p>
          {/* {status === "success" && <Success />} */}
        </header>

        <main>
          <div className="form__input--content">
            <UserInput
              svg={{ type: "email" }}
              styleClass="login_email"
              errorMessage={error.email}
              input={{ type: "email", placeholder: "Correo electrónico", value: email, handleOnChange: handleChangeLogin, name: "email" }}
            />

            <UserInput
              svg={{ type: "padlock" }}
              svgTwo={{ type: "eye" }}
              styleClass="login--password"
              errorMessage={error.password}
              input={{ type: "password", placeholder: "Contraseña", value: password, handleOnChange: handleChangeLogin, name: "password" }}
            />
          </div>

          <div className="form__error-back--content">
            {/* {statusUserMutation.isErrorUser && <div>{typeof statusUserMutation.errorUser === "string" && statusUserMutation.errorUser}</div>} */}
            {statusUserMutation.errorUser?.errors.some(e => e.field === 'general') &&
              <ul>
                {statusUserMutation.errorUser?.errors.filter(e => e.field === 'general').map((e, i) => (
                  <span key={i}>{e.message}</span>
                ))}
              </ul>
            }
          </div>

          <div className="form__button--content">
            <div className="button__reset--content">
              <button id='button__login--reset' onClick={handleClickLogin} className="button_link" disabled={false} >¿Olvidaste tu contraseña?</button>
            </div>
            <button id='button__login--login' onClick={handleClickLogin} className="button_dark" disabled={false} >{false ? <Spinner /> : "Iniciar Sesión"}</button>
            <button id='button__login--registre' onClick={handleClickLogin} className="button_dark" disabled={false}>Crear cuenta</button>
            <hr />
            <button id='button__login--back' onClick={handleClickLogin} className="button_light" disabled={false} >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;