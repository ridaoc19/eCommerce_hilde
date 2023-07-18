import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropsUseChange } from "../../../components/hooks/useOnChange";
import { validationClick } from '../../../components/utils/validation';
import { useAppDispatch } from '../../../redux/hooks';
import { clearUser } from '../../../redux/reducers/user';
import { fetchPosts } from '../../../redux/reducers/user/actions';
import { ReduxUser } from '../../../redux/reducers/user/interface';
import Input from '../../../styles/content/input/Input';
import Loading from '../../../styles/content/loading';

interface Props {
  handleOnChange: (data: { name: string; value: string; }) => void;
  change: PropsUseChange
  errorBack: Pick<ReduxUser.PostState, 'error'>;
  status: string;
}


function Form({ handleOnChange, change, errorBack, status }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, lastName, email } = change;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLFormElement).id.split("--")[1];
    event.preventDefault();

    switch (id) {
      case "save":
        const { dataPost, authorize } = validationClick({ change, handleOnChange })
        // dispatch(fetchPosts({name: name.change, lastName: lastName.change, email: email.change}));
        if (authorize) {
          dispatch(fetchPosts(dataPost));
        }
        return;
      case "back":
        navigate('/login');
        break;
      default:
        break;;
    }
    dispatch(clearUser());
  };

  return (
    <div className="registre__form--container">
      <div className="registre__form--content">

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

          </div>

          <div className="form__error-back--content">
            {/* <span>{typeof errorBack === "string" && errorBack}</span> */}
            {typeof errorBack === "string" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">

            <button id='button__registre--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Loading /> : "Crear Usuario"}</button>
            <hr />
            <button id='button__registre--back' onClick={handleOnClick} className="button_light" disabled={status === "loading" || status === "success"} >Volver</button>



            {/* <button id='button__registre--save' onClick={handleOnClick} className="button_dark" >Guardar</button>
            <hr />
            <Link to={'/login'}>
              <button id='button__registre--back' onClick={handleOnClick} className="button_light" >Iniciar Sesión</button>
            </Link> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;


