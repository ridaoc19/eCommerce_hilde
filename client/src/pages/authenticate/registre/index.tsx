import { Link } from "react-router-dom";
import Svg from "../../../components/assets/Svg";
import useOnChange from "../../../components/hooks/useOnChange";
import Input from "../../../styles/content/input/Input";
// import Ejemplo from "./Pes";

const initialState = {
  name: { change: "", message: "" },
  email: { change: "", message: "" },
  password: { change: "", message: "" },
  confirmPassword: { change: "", message: "" },
}

function Registre() {
  const { change: { name, email, password, confirmPassword }, handleOnChange } = useOnChange(initialState)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="registre__form--container">
      <form onSubmit={handleOnSubmit} className="registre__form--content">

        <header className="form__header--content">
          <h2>Regístrate</h2>
          <p>Ingresa tus datos personales para crear tu cuenta</p>
        </header>

        <main>
          <div className="form__input--content">
            <Input svg={{ type: "user" }} styleClass="registre_name" errorMessage={name.message}
              input={{ name: "name", type: "text", placeholder: "Nombre", value: name.change, handleOnChange }}
            />


            <Input svg={{ type: "email" }} styleClass="registre_email" errorMessage={email.message}
              input={{ name: "email", type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange }}
            />


            <Input
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--password" errorMessage={password.message}
              input={{ name: "password", type: "password", placeholder: "Contraseña", value: password.change, handleOnChange }}
            />


            <Input
              svg={{ type: "padlock" }} svgTwo={{ type: "eye" }} styleClass="registre--confirmPassword" errorMessage={confirmPassword.message}
              input={{ name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña", value: confirmPassword.change, handleOnChange }}
            />

          </div>

          <div className="form__button--content">
            <input type="submit" className="button_dark" value="Guardar" />
            <hr />
            <Link to={'/login'}>
              <input type="submit" className="button_light" value="Iniciar Sesión" />
            </Link>
          </div>
        </main>
      </form>
    </div>
  );
}

export default Registre;

