import { useEffect } from 'react';
import { Link } from "react-router-dom";
import useOnChange from "../../../components/hooks/useOnChange";
import useOnClick from "../../../components/hooks/useOnClick";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserError } from "../../../redux/reducers/user";
import Input from "../../../styles/content/input/Input";



const initialState = {
  name: { change: "", message: "" },
  lastName: { change: "", message: "" },
  email: { change: "", message: "" },
  password: { change: "", message: "" },
  confirmPassword: { change: "", message: "" },
}

function Registre() {
  const { change, handleOnChange, handleErrorOnBack } = useOnChange(initialState)
  const { handleOnClick } = useOnClick()
  const { name, lastName, email, password, confirmPassword } = change;
  const errorBack = useAppSelector(selectUserError)

  useEffect(() => {
    if (errorBack instanceof Object) {
      handleErrorOnBack({ errorBack })
    }
  }, [errorBack])

  return (
    <div className="registre__form--container">
      <form onSubmit={(event) => handleOnClick({ event, change, handleOnChange })} className="registre__form--content">

        <header className="form__header--content">
          <h2>Regístrate</h2>
          <p>Ingresa tus datos personales para crear tu cuenta</p>
        </header>

        <main>
          <div className="form__input--content">

            <Input svg={{ type: "user" }} styleClass="registre_name" errorMessage={name.message}
              input={{ name: "name", type: "text", placeholder: "Nombres", value: name.change, handleOnChange }}
            />

            <Input svg={{ type: "user" }} styleClass="registre_lastName" errorMessage={lastName.message}
              input={{ name: "lastName", type: "text", placeholder: "Apellidos", value: lastName.change, handleOnChange }}
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

          <div className="form__error-back--content">
            <span>{typeof errorBack === "string" && errorBack}</span>
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

