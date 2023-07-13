import React from 'react';
import Svg from '../../../components/assets/Svg';

function Success({ name, email }: { name: string | undefined, email: string | undefined }) {
  return (
    <div className='registre__success--container'>
      <div>
        {Svg({type: "success", height: 164, width: 164})}
        <h2>¡Registro exitoso!</h2>
        <p>
          Hola <span>{name}</span>, tu registro ha sido exitoso. Por favor, revisa tu cuenta de correo electrónico (<span>{email}</span>) donde encontrarás una contraseña temporal que podrás utilizar para iniciar sesión. Una vez que hayas ingresado a tu cuenta, podrás cambiar la contraseña por una de tu preferencia.
        </p>
        <p>¡Disfruta de todos los beneficios de nuestra página!</p>
      </div>
    </div>
  );
}

export default Success;