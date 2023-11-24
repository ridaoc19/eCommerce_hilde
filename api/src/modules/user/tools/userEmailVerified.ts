import { Response } from "express";
import { sendEmail } from "../../../core/utils/email";
import { User } from "../model";
import { errorHandlerCatch } from "../../../core/utils/send/errorHandler";

function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

export async function userEmailVerified({ _id, newEmail, res }: { _id: string, newEmail: string, res: Response }) {

  try {
    await stopExecutionTemporarily();
    const userDBOne = await User.findById(_id)
    if (!userDBOne) throw new Error(`se presento un inconveniente al solicitar información del usuario`)

    if (userDBOne?.email !== newEmail) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: newEmail, type: 'firstNotificationEmail' })
      if (!responseEmailOne) throw new Error(`error en enviar el primer correo`)
    } else if (userDBOne?.email === newEmail) return

    await stopExecutionTemporarily();
    const userDBTwo = await User.findById(_id)
    if (!userDBTwo) throw new Error(`se presento un inconveniente al solicitar información del usuario en la segunda notificación`)
    await User.findByIdAndUpdate(_id, { verifiedEmail: true })

    if (userDBTwo?.email !== newEmail) {
      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: newEmail, type: 'secondNotificationEmail' })
      console.log(responseEmailTwo)
      if (!responseEmailTwo) throw new Error(`Error al enviar el segundo correo`)
    } else if (userDBTwo?.email === newEmail) return

  } catch (error) {
    errorHandlerCatch({ error, res })
  }

}