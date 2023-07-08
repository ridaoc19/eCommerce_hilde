import { Link } from "react-router-dom";
import Svg from "../../../components/assets/Svg";
import useOnChange from "../../../components/hooks/useOnChange";
import Input from "../../../styles/content/input/Input";
// import Ejemplo from "./Pes";

const initialState = {
  email: { change: "", message: "" },
  password: { change: "", message: "" },
}

function Login() {
  const { change: { email, password }, handleOnChange } = useOnChange(initialState)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="login__form--container">
      <form onSubmit={handleOnSubmit} className="login__form--content">

        <header className="form__header--content">
          {Svg({ type: "logo", height: 80, width: 80 })}
          <h2>¡Bienvenido!</h2>
          <p>Ingresa tus datos para iniciar sesión en</p>
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

          <div className="form__button--content">
            <div className="button__reset--content">
              <Link to={'/reset'}>
                <input type="submit" className="button_link" value="¿Olvidaste tu contraseña?" />
              </Link>
            </div>
            <input type="submit" className="button_dark" value="Iniciar Sesión" />
            <Link to={'/registre'}>
              <input type="submit" className="button_dark" value="Crear cuenta" />
            </Link>
            <hr />
            <Link to={'/'}>
              <input type="submit" className="button_light" value="Volver" />
            </Link>
          </div>
        </main>
      </form>
      {/* <Ejemplo /> */}
    </div>
  );
}

export default Login;

