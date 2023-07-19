import { sendEmail } from "../../../core/utils/email";
import { User } from "../model";

function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

export async function userCreatedVerified({ _id }: { _id: string }) {

  try {
    await stopExecutionTemporarily();
    const userDBOne = await User.findById(_id)
    if (!userDBOne) throw new Error(`errorString: se presento un inconveniente uno</p>`)
    if (!userDBOne?.verified) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: userDBOne?.email, type: 'firstNotificationRegistre' })
      if (!responseEmailOne) throw new Error(`errorString: error en el primer correo`)
    } else if (userDBOne?.verified) return

    await stopExecutionTemporarily();
    const userDBTwo = await User.findById(_id)
    if (!userDBTwo) throw new Error(`errorString: se presento un inconveniente dos</p>`)
    if (!userDBTwo.verified) {
      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: userDBTwo?.email, type: 'secondNotificationRegistre' })
      if (!responseEmailTwo) throw new Error(`errorString: dos  correo`)
      await User.findByIdAndDelete(_id)
    } else if (userDBOne?.verified) return

  } catch (error) {
    console.log("hubo un error", error)
  }

}