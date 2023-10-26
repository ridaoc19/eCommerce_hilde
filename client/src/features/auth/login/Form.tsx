import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import { IUser, IUserComponents } from '../../../interfaces/user.interface';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearUser, selectUserData } from '../../../redux/reducers/user';
import { userPosts } from '../../../redux/reducers/user/actions';
import { userValidationClick } from '../../../utils/validations/userValidation';
import Success from './Success';

function Form({ change, handleOnChange, status, errorBack }: IUserComponents.FormProps) {
  const [errorValidateEmail, setErrorValidateEmail] = useState("");
  const { email, password } = change
  const dataUser = useAppSelector(selectUserData)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataUser && !dataUser?.verifiedEmail) {
      setErrorValidateEmail(`${dataUser.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${dataUser.email}`)
      setTimeout(() => {
        setErrorValidateEmail("")
      }, 10000);
    }
  }, [dataUser?.verifiedEmail])

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login":
        const { dataPost, authorize } = userValidationClick({ change, handleOnChange, routes: "login" })
        if (authorize) dispatch(userPosts(dataPost as IUser.LoginData));
        return;
      case "reset":
        navigate('/reset');
        break;
      case "registre":
        navigate('/registre');
        break;
      case "back":
        navigate('/');
        break;
      default:
        break;;
    }
    dispatch(clearUser());
  };

  return (
    <div className="login__form--container">
      <div className="login__form--content">

        <header className="form__header--content">
          {Svg({ type: "logo", height: 80, width: 80, color: "#F6851F" })}
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tus datos para iniciar sesión</p>
          {status === "success" && <Success />}
        </header>

        <main>
          <div className="form__input--content">
            <UserInput svg={{ type: "email" }} styleClass="login_email" errorMessage={email.message}
              input={{ type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange, name: "email" }}
            />

            <UserInput
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="login--password" errorMessage={password.message}
              input={{ type: "password", placeholder: "Contraseña", value: password.change, handleOnChange, name: "password" }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
            {errorValidateEmail && <div>{errorValidateEmail}</div>}
          </div>

          <div className="form__button--content">
            <div className="button__reset--content">
              <button id='button__login--reset' onClick={handleOnClick} className="button_link" disabled={status === "loading" || status === "success"} >¿Olvidaste tu contraseña?</button>
            </div>
            <button id='button__login--login' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Spinner /> : "Iniciar Sesión"}</button>
            <button id='button__login--registre' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"}>Crear cuenta</button>
            <hr />
            <button id='button__login--back' onClick={handleOnClick} className="button_light" disabled={status === "loading" || status === "success"} >Volver</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;