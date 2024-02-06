import { useMutationUser } from './index';

function Success() {
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div className="login__success--container">
      <h2>¡Inicio de sesión exitoso!</h2>
      <p>
        Hola <span>{userData?.name}</span>,Te damos la bienvenida de vuelta a nuestro sitio web.
      </p>
    </div>
  );
}

export default Success;
