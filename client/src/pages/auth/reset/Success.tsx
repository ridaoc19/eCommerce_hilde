import { useContext } from 'react';
import { CreateContext } from '../../../hooks/useContext';


function Success() {
  // const { data: { getUserQueryData } } = useMutationUser();
  const { dashboard: { stateDashboard: { login: {user} } } } = useContext(CreateContext)

  // const { userData } = getUserQueryData()

  return (
    <div className="reset__success--container">
      <h2>¡Restablecimiento exitoso!</h2>
      <p><span>{user?.name}</span>, revisa tu bandeja de entrada de correo electrónico ({user?.email}). Pronto recibirás una contraseña temporal.</p>
    </div>
  );
}

export default Success;
