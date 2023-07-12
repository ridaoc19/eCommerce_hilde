import { FormEvent } from 'react';
import { PropsUseChange } from "../../../components/hooks/useOnChange";
import { Link } from 'react-router-dom';
import { validationClick } from '../../../components/utils/validation';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchPosts } from '../../../redux/reducers/user/actions';
import Input from '../../../styles/content/input/Input';

interface Props {
  handleOnChange: (data: { name: string; value: string; }) => void;
  change: PropsUseChange
  errorBack: string | null | {}
}


function Form({ handleOnChange, change, errorBack }: Props) {
  const dispatch = useAppDispatch();
  const { name, lastName, email, password, confirmPassword } = change;

  const handleOnSubmit = ({ event, handleOnChange }: { event: FormEvent<HTMLFormElement>, handleOnChange: any }) => {
    event.preventDefault();
    const { dataPost, authorize } = validationClick({ change, handleOnChange })

    // console.log(Object.values(dataPost).every(value => value !== ''));
    if (authorize) {
      dispatch(fetchPosts(dataPost));
    }
  }

  return (
    <div className="registre__form--container">
      <form onSubmit={(event) => handleOnSubmit({ event, handleOnChange })} className="registre__form--content">

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

export default Form;