import { Request, Response } from "express";
import { sendEmail } from "../../../core/utils/email";
import { errorHandlerCatch } from "../../../core/utils/send/errorHandler";
import { AppDataSource } from "../../../data-source";
import { UserEntity } from "../entity";

function stopExecutionTemporarily() {
  return new Promise(resolve => {
    setTimeout(resolve, 5 * 60 * 1000); // Esperar 10 minutos (10 * 60 segundos * 1000 milisegundos)
  });
}

export async function userEmailVerified({ _id, newEmail, res, req }: { _id: string, newEmail: string, res: Response, req: Request }) {
  const userRepository = AppDataSource.getRepository(UserEntity);

  try {
    await stopExecutionTemporarily();
    // const userDBOne = await User.findById(_id)
    const userDBOne = await userRepository.findOne({ where: { _id } })

    if (!userDBOne) throw new Error(`se presento un inconveniente al solicitar información del usuario`)

    if (userDBOne?.email !== newEmail) {
      const responseEmailOne: boolean = await sendEmail({ name: userDBOne.name, email: newEmail, type: 'firstNotificationEmail' })
      if (!responseEmailOne) throw new Error(`error en enviar el primer correo`)
    } else if (userDBOne?.email === newEmail) return

    await stopExecutionTemporarily();
    // const userDBTwo = await User.findById(_id)
    const userDBTwo = await userRepository.findOne({ where: { _id } })

    if (!userDBTwo) throw new Error(`se presento un inconveniente al solicitar información del usuario en la segunda notificación`)
    userDBTwo.verifiedEmail = true
    await userRepository.save(userDBTwo);
    // await User.findByIdAndUpdate(_id, { verifiedEmail: true })

    if (userDBTwo?.email !== newEmail) {
      const responseEmailTwo: boolean = await sendEmail({ name: userDBTwo.name, email: newEmail, type: 'secondNotificationEmail' })
      console.log(responseEmailTwo)
      if (!responseEmailTwo) throw new Error(`Error al enviar el segundo correo`)
    } else if (userDBTwo?.email === newEmail) return

  } catch (error) {
    errorHandlerCatch({ req, error, res })
  }

}