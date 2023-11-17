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
    <div className="registre__success--container">
      <div>
        {Svg({ type: "success", height: 164, width: 164 })}
        <h2>¡Registro exitoso!</h2>
        <p>
          Hola <span>{dataUser?.name}</span>, tu registro ha sido exitoso. Por
          favor, revisa tu cuenta de correo electrónico (
          <span>{dataUser?.email}</span>) donde encontrarás una contraseña
          temporal que podrás utilizar para iniciar sesión. Una vez que hayas
          ingresado a tu cuenta, podrás cambiar la contraseña por una de tu
          preferencia.
        </p>
        <p>¡Disfruta de todos los beneficios de nuestra página!</p>
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
