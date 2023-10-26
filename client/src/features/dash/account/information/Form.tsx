import { MouseEventHandler } from 'react';
import Spinner from '../../../../components/common/spinner';
import UserInput from '../../../../components/common/userInput/UserInput';
import { IUser, IUserComponents } from '../../../../interfaces/user.interface';
import { useAppDispatch } from '../../../../redux/hooks';
import { userPosts } from '../../../../redux/reducers/user/actions';
import { userValidationClick } from '../../../../utils/validations/userValidation';
import Success from './Success';

function Form({ handleOnChange, change, errorBack, status }: IUserComponents.FormProps) {
  const dispatch = useAppDispatch();
  const { name, lastName, email, phone } = change;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const { dataPost, authorize } = userValidationClick({ change, handleOnChange, routes: 'account' })
    if (authorize) dispatch(userPosts(Object.assign(dataPost, { components: "information" }) as IUser.InformationData));
  };


  return (
    <div className="dashboard__user-form--container">
      <div className="dashboard__user-form--content">
        {status === "success" && <Success />}

        <main>

          <div className="user-form__input--content">

            <UserInput svg={{ type: "user" }} styleClass="registre_name" errorMessage={name.message}
              input={{ name: "name", type: "text", placeholder: "Nombres", value: name.change, handleOnChange }}
            />

            <UserInput svg={{ type: "user" }} styleClass="registre_lastName" errorMessage={lastName.message}
              input={{ name: "lastName", type: "text", placeholder: "Apellidos", value: lastName.change, handleOnChange }}
            />

            <UserInput svg={{ type: "email" }} styleClass="registre_email" errorMessage={email.message}
              input={{ name: "email", type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange }}
            />

            <UserInput svg={{ type: "phone" }} styleClass="registre_phone" errorMessage={phone.message}
              input={{ name: "phone", type: "phone", placeholder: "Teléfono", value: phone.change, handleOnChange }}
            />

          </div>

          <div className="form__error-back--content">
            {typeof errorBack === "string" && status === "error" && <div dangerouslySetInnerHTML={{ __html: errorBack }}></div>}
          </div>

          <div className="form__button--content">
            <button id='button__dashboard--save' onClick={handleOnClick} className="button_dark" disabled={status === "loading" || status === "success"} >{status === "loading" ? <Spinner /> : "Editar Usuario"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Form;


