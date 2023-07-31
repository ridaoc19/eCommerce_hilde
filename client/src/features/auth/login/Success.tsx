import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/reducers/user";

function Success() {
  const dataUser = useAppSelector(selectUserData);

  return (
    <div className="login__success--container">
      <h2>¡Inicio de sesión exitoso!</h2>
      <p>
        Hola <span>{dataUser?.name}</span>,Te damos la bienvenida de vuelta a nuestro sitio web.
      </p>
    </div>
  );
}

export default Success;
