import { useMutationUser } from "../../../auth/login";

function Success() {
  const { data: { getUserQueryData } } = useMutationUser();
  const { userData } = getUserQueryData()

  return (
    <div className="account__success--container">
      <div>
        <h2>¡Contraseña cambiada exitosamente!</h2>
        <p>
          ¡Hola <span>{userData?.name}</span>! Tu contraseña ha sido actualizada con éxito.
        </p>
      </div>
    </div>
  );
}

export default Success;
