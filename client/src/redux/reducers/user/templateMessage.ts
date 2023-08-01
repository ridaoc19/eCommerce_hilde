import { IReduxUser } from "../../../interfaces/redux/user/user.interface"

export const templateMessage: IReduxUser.TemplateMessageProps = ({ routes }) => {
  switch (routes) {
    case "registre":
      return {
        routes,
        message: `
      <p>No se pudo completar la creación de tu cuenta</p>
      <p>Lamentablemente, hemos encontrado un problema al procesar tu solicitud de registro en este momento.</p>
      <p>Si tienes alguna pregunta o necesitas asistencia, por favor, contáctanos a través de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a> y estaremos encantados de ayudarte.</p>
      ` }

    case "change":
      return {
        routes,
        message: `
      <p>No se pudo cambiar la contraseña en este momento</p>
      <p>Lamentamos informarte que estamos experimentando dificultades técnicas en este momento que nos impiden procesar tu solicitud de cambio de contraseña.</p>
      <p>Por favor, intenta cambiarla nuevamente. Si el problema persiste, por favor, contáctanos a través 
      de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a></p>
      `}

    case 'reset':
      return {
        routes,
        message: `
        <p>No se pudo restablecer la contraseña en este momento</p>
        <p>Lamentamos informarte que estamos experimentando dificultades técnicas en este momento que nos impiden procesar tu solicitud de restablecimiento de contraseña.</p>
        <p>Por favor, te recomendamos intentar restablecer tu contraseña nuevamente más tarde. Si el problema persiste, no dudes en contactarnos a través de nuestro correo electrónico de soporte: <a href="mailto:hilde.ecommerce@outlook.com">hilde.ecommerce@outlook.com</a></p>
        `}

    case 'login':
      return {
        routes,
        message: `
          <p>No se pudo iniciar sesión en este momento</p>
          <p>Lo sentimos, estamos experimentando problemas técnicos en nuestros servidores y no podemos procesar tu solicitud de inicio de sesión.</p>
          <p>Por favor, intenta iniciar sesión nuevamente más tarde. Si el problema persiste, por favor, contáctanos a través 
          de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a></p>
          `}

    case 'token':
      return {
        routes,
        message: `
        <p>Lo sentimos, estamos experimentando problemas técnicos en nuestros servidores y no podemos procesar tu solicitud.</p>
        `}

    case 'account':
      return {
        routes,
        message: `
      <p>No se pudo actualizar su datos personales</p>
      <p>Lamentablemente, hemos encontrado un problema al procesar tu solicitud de registro en este momento.</p>
      <p>Si tienes alguna pregunta o necesitas asistencia, por favor, contáctanos a través de <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a> y estaremos encantados de ayudarte.</p>
      ` }

    default:
      return { routes: "", message: "" }
  }
}