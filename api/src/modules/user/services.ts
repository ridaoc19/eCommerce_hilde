import { Request, Response } from "express";
import { User } from "./model";
import { splitString } from "../../core/utils/splitString";
import { sendEmail } from "../../core/utils/email";


function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postUser(req: Request, res: Response) {
  try {
    const { name, lastName, email, password } = req.body;

    const userDB = await User.create({ name, lastName, email, password })
    const user = await fetchCount({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email })

    // await sendEmail({ name: userDB.name, email: userDB.email })

    res.status(200).json({ _id: userDB._id, name: userDB.name })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

