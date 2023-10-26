import { sendEmail } from "../../../core/utils/email";
import { User } from "../model";

function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

export async function userEmailVerified({ _id, newEmail }: { _id: string, newEmail: string }) {

  try {
    await stopExecutionTemporarily();
    const userDBOne = await User.findById(_id)
    if (!userDBOne) throw new Error(`errorString: se presento un inconveniente uno</p>`)

    if (userDBOne?.email !== newEmail) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: newEmail, type: 'firstNotificationEmail' })
      if (!responseEmailOne) throw new Error(`errorString: error en el primer correo`)
    } else if (userDBOne?.email === newEmail) return

    await stopExecutionTemporarily();
    const userDBTwo = await User.findById(_id)
    if (!userDBTwo) throw new Error(`errorString: se presento un inconveniente dos</p>`)
    await User.findByIdAndUpdate(_id, { verifiedEmail: true })

    if (userDBTwo?.email !== newEmail) {
      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: newEmail, type: 'secondNotificationEmail' })
      if (!responseEmailTwo) throw new Error(`errorString: dos  correo`)
    } else if (userDBTwo?.email === newEmail) return

  } catch (error) {
    console.log("hubo un error", error)
  }

}