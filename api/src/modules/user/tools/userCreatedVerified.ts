import { sendEmail } from "../../../core/utils/email";
import { User } from "../model";

function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

interface UserCreatedVerified {
  _id: string,
}

export async function userCreatedVerified({ _id }: UserCreatedVerified) {

  try {
    await stopExecutionTemporarily();
    const userDBOne = await User.findById(_id)
    if (!userDBOne) throw new Error(`se presento un inconveniente al solicitar información del usuario`)
    if (!userDBOne?.verified) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: userDBOne?.email, type: 'firstNotificationRegistre' })
      if (!responseEmailOne) throw new Error(`error en enviar el primer correo`)
    } else if (userDBOne?.verified) return

    await stopExecutionTemporarily();
    const userDBTwo = await User.findById(_id)
    if (!userDBTwo) throw new Error(`se presento un inconveniente al solicitar información del usuario en la segunda notificación`)
    if (!userDBTwo.verified) {
      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: userDBTwo?.email, type: 'secondNotificationRegistre' })
      if (!responseEmailTwo) throw new Error(`Error al enviar el segundo correo`)
      await User.findByIdAndDelete(_id)
    } else if (userDBOne?.verified) return

  } catch (error) {
    throw Error
  }

}