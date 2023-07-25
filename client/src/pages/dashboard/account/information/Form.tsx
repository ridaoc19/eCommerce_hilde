import { MouseEventHandler } from 'react';
import { IUser } from '../../../../components/utils/interface/user';
import { validationClick } from '../../../../components/utils/validation';
import { useAppDispatch } from '../../../../redux/hooks';
import { userPosts } from '../../../../redux/reducers/user/actions';
import Input from '../../../../styles/content/input/Input';
import Loading from '../../../../styles/content/loading';
import Success from './Success';

function Form({ handleOnChange, change, errorBack, status }: IUser.PropsForm) {
  const dispatch = useAppDispatch();
  const { name, lastName, email, phone } = change;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const { dataPost, authorize } = validationClick({ change, handleOnChange, routes: 'account' })

    if (authorize) dispatch(userPosts(Object.assign(dataPost, { components: "information" })));
  };


  return (
    <div className="dashboard__user-form--container">
      <div className="dashboard__user-form--content">
        {status === "success" && <Success />}

        <main>

          <div className="user-form__input--content">

            <Input svg={{ type: "user" }} styleClass="registre_name" errorMessage={name.message}
              input={{ name: "name", type: "text", placeholder: "Nombres", value: name.change, handleOnChange }}
            />

            <Input svg={{ type: "user" }} styleClass="registre_lastName" errorMessage={lastName.message}
              input={{ name: "lastName", type: "text", placeholder: "Apellidos", value: lastName.change, handleOnChange }}
            />

            <Input svg={{ type: "email" }} styleClass="registre_email" errorMessage={email.message}
              input={{ name: "email", type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange }}
            />

            <Input svg={{ type: "phone" }} styleClass="registre_phone" errorMessage={phone.message}
              input={{ name: "phone", type: "phone", placeholder: "Teléfono", value: phone.change, handleOnChange }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__dashboard--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Loading /> : "Editar Usuario"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;


