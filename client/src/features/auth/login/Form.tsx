import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';
import Input from '../../../components/common/input/Input';
import Spinner from '../../../components/common/spinner';
import { useAppDispatch } from '../../../redux/hooks';
import { clearUser } from '../../../redux/reducers/user';
import { userPosts } from '../../../redux/reducers/user/actions';
import { validationClick } from '../../../utils/validations/userValidation';
import Success from './Success';
import { IAuth } from '../../../interfaces/features/auth/auth.interface';

function Form({ change, handleOnChange, status, errorBack }: IAuth.FormProps) {
  const { email, password } = change
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login":
        const { dataPost, authorize } = validationClick({ change, handleOnChange, routes: "login" })
        if (authorize) dispatch(userPosts(dataPost as IAuth.LoginData));
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
            <Input svg={{ type: "email" }} styleClass="login_email" errorMessage={email.message}
              input={{ type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange, name: "email" }}
            />

            <Input
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="login--password" errorMessage={password.message}
              input={{ type: "password", placeholder: "Contraseña", value: password.change, handleOnChange, name: "password" }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
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