import React from 'react';
import { Link } from 'react-router-dom';
import useOnChange from '../../../components/hooks/useOnChange';
import Input from '../../../styles/content/input/Input';

const initialState = {
  email: { change: "", message: "" },
}

function Reset() {

  const { change: { email }, handleOnChange } = useOnChange(initialState)

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="reset__form--container">
      <form onSubmit={handleOnSubmit} className="reset__form--content">

        <header className="form__header--content">
          <h2>Recuperar contraseña</h2>
          <p>Ingresa el correo electrónico que tienes registrado</p>
        </header>

        <main>
          <div className="form__input--content">
            <Input svg={{ type: "email" }} styleClass="reset_email" errorMessage={email.message}
              input={{ type: "email", placeholder: "Correo electrónico", value: email.change, handleOnChange, name: "email" }}
            />

          </div>

          <div className="form__button--content">
            <input type="submit" className="button_dark" value="Enviar correo" />
            <Link to={'/login'}>
              <input type="submit" className="button_light" value={`Volver`} />
            </Link>
          </div>
        </main>
      </form>
    </div>
  );
}

export default Reset;