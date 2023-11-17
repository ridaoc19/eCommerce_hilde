import { useMutationUser } from './index';


function Success() {
  const { fetchUserMutation: { getQueryUser } } = useMutationUser();
  const { dataUser } = getQueryUser()

  return (
    <div className="reset__success--container">
      <h2>¡Restablecimiento exitoso!</h2>
      <p><span>{dataUser?.name}</span>, revisa tu bandeja de entrada de correo electrónico ({dataUser?.email}). Pronto recibirás una contraseña temporal.</p>
    </div>
  );
}

export default Success;
