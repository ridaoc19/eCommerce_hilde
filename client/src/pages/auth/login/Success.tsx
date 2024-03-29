import { useContext } from 'react';
import { CreateContext } from '../../../hooks/useContext';

function Success() {
  const { dashboard: { stateDashboard: { login: { user } } } } = useContext(CreateContext)
  // const { data: { getUserQueryData } } = useMutationUser();
  // const { userData } = getUserQueryData()

  return (
    <div className="login__success--container">
      <h2>¡Inicio de sesión exitoso!</h2>
      <p>
        Hola <span>{user?.name}</span>,Te damos la bienvenida de vuelta a nuestro sitio web.
      </p>
    </div>
  );
}

export default Success;
