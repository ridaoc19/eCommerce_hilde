import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateHashPassword } from "../../../core/auth/bcryptUtils";
import { sendEmail } from "../../../core/utils/email";
import { AppDataSource } from '../../../data-source';
import { UserEntity } from '../entity';


function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

interface UserResetVerified {
  _id: string,
  res: Response
}

export async function userResetVerified({ _id }: UserResetVerified) {
  try {
    const userRepository = AppDataSource.getRepository(UserEntity);

    await stopExecutionTemporarily();
    // const userDBOne = await User.findById(_id)
    const userDBOne = await userRepository.findOne({ where: { _id } })

    if (!userDBOne) throw new Error(`se presento un inconveniente al solicitar información del usuario`)
    if (!userDBOne?.verified) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: userDBOne?.email, type: 'firstNotificationReset' })
      if (!responseEmailOne) throw new Error(`error en enviar el primer correo`)
    } else if (userDBOne?.verified) return

    await stopExecutionTemporarily();
    // const userDBTwo = await User.findById(_id)
    const userDBTwo = await userRepository.findOne({ where: { _id } })

    if (!userDBTwo) throw new Error(`se presento un inconveniente al solicitar información del usuario en la segunda notificación`)
    if (!userDBTwo.verified) {
      // crea y actualiza contraseña
      const temporaryPassword: string = uuidv4().split("-", 1)[0];
      const password = await generateHashPassword(temporaryPassword)

      userDBTwo.password = password;
      await userRepository.save(userDBTwo);
      // const userDB = await User.findByIdAndUpdate({ _id }, { password }, { new: true })
      if (!userDBTwo) throw new Error(`Problema al guardar contraseña por no cambiar`)

      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: userDBTwo?.email, type: "secondNotificationReset" })
      if (!responseEmailTwo) throw new Error(`Error al enviar el segundo correo`)
    } else if (userDBOne?.verified) return

  } catch (error) {
    console.log("hubo un error", error)
  }

}