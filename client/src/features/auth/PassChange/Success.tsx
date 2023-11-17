import { useNavigate, HandleClick, Svg, useMutationUser } from './index';

function Success() {
  const { fetchUserMutation: { removeFetch, getQueryUser } } = useMutationUser();
  const { dataUser } = getQueryUser()
  const navigate = useNavigate();

  const handleOnClick: HandleClick = (event) => {
    event.preventDefault();
    removeFetch()
    navigate("/login");
  };

  return (
    <div className="pass-change__success--container">
      <div>
        {Svg({ type: "success", height: 164, width: 164 })}
        <h2>¡Contraseña cambiada con éxito!</h2>
        <p><span>{dataUser?.name}</span> a partir de ahora, puedes iniciar sesión en tu cuenta con la nueva contraseña.</p>
        <div className="success--button">
          <div>
            <button className="button_light" onClick={handleOnClick}>¡Entendido!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
