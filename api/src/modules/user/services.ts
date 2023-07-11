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


    const { _id, name, lastName, email } = await User.create(req.body)
    const user = await fetchCount({ _id, name, lastName, email })

    await sendEmail({name, email})

    res.status(200).json(user.data)

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

