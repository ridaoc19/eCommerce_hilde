import { v4 as uuidv4 } from 'uuid';
import { generateHashPassword } from "../../../core/auth/bcryptUtils";
import { sendEmail } from "../../../core/utils/email";
import { User } from "../model";


function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 1 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

export async function userResetVerified({ _id }: { _id: string }) {

  try {

    await stopExecutionTemporarily();
    const userDBOne = await User.findById(_id)
    if (!userDBOne) throw new Error(`errorString: se presento un inconveniente reset uno</p>`)
    if (!userDBOne?.verified) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: userDBOne?.email, type: 'firstNotificationReset' })
      if (!responseEmailOne) throw new Error(`errorString: error en el primer correo`)
    } else if (userDBOne?.verified) return

    await stopExecutionTemporarily();
    const userDBTwo = await User.findById(_id)
    if (!userDBTwo) throw new Error(`errorString: se presento un inconveniente reset dos</p>`)
    if (!userDBTwo.verified) {
      // crea y actualiza contraseña
      const temporaryPassword: string = uuidv4().split("-", 1)[0];
      const password = await generateHashPassword(temporaryPassword)
      const userDB = await User.findByIdAndUpdate({ _id }, { password }, { new: true })
      if (!userDB) throw new Error(`errorString: problema al guardar contraseña por no cambiar</p>`)

      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: userDBTwo?.email, type: "secondNotificationReset" })
      if (!responseEmailTwo) throw new Error(`errorString: dos reset  correo`)
    } else if (userDBOne?.verified) return

  } catch (error) {
    console.log("hubo un error", error)
  }

}