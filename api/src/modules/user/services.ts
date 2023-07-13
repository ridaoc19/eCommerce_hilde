import { Request, Response } from "express";
import { User } from "./model";
import { splitString } from "../../core/utils/splitString";
import { generateHashPassword } from "../../core/auth/bcryptUtils";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "../../core/utils/email";


function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postUser(req: Request, res: Response) {
  try {
    const { name, lastName, email } = req.body;
    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    // const { name, lastName, email, password: passFront } = req.body;

    const password = await generateHashPassword(temporaryPassword)

    const userDB = await User.create({ name, lastName, email, password })
    const user = await fetchCount({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email })

    const responseEmail: boolean = await sendEmail({ name: userDB.name, email: userDB.email, password: temporaryPassword })

    if (!responseEmail) throw new Error(`errorEmail: <p><span>${name}</span> se presento un inconveniente al enviar la contraseña al correo <span>${email}</span></p>`)

    res.status(200).json({ _id: userDB._id, name: userDB.name, email: userDB.email })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

