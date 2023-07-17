import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../components/assets/Svg';
import { PropsUseChange } from '../../../components/hooks/useOnChange';
import { validationClick } from '../../../components/utils/validation';
import { useAppDispatch } from '../../../redux/hooks';
import { clearUser } from '../../../redux/reducers/user';
import { loginPosts } from '../../../redux/reducers/user/actions';
import Input from '../../../styles/content/input/Input';
import Loading from '../../../styles/content/loading';
import Success from './Success';

interface Props {
  handleOnChange: (data: { name: string; value: string; }) => void;
  change: PropsUseChange;
  status: string;
  errorBack: string
}


function Form({ change, handleOnChange, status, errorBack }: Props) {
  const { email, password } = change
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "login":
        const { dataPost, authorize } = validationClick({ change, handleOnChange })
        if (authorize) dispatch(loginPosts(dataPost));
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
          {Svg({ type: "logo", height: 80, width: 80 })}
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tus datos para iniciar sesión en</p>
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
            {/* {typeof errorBack === "string" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>} */}
            {status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <div className="button__reset--content">
              <button id='button__login--reset' onClick={handleOnClick} className="button_link" disabled={status === "loading" || status === "success"} >¿Olvidaste tu contraseña?</button>
            </div>
            <button id='button__login--login' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Loading /> : "Iniciar Sesión"}</button>
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