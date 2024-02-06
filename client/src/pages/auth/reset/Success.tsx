import { useMutationUser } from './index';


function Success() {
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div className="reset__success--container">
      <h2>¡Restablecimiento exitoso!</h2>
      <p><span>{userData?.name}</span>, revisa tu bandeja de entrada de correo electrónico ({userData?.email}). Pronto recibirás una contraseña temporal.</p>
    </div>
  );
}

export default Success;
