import { Request, Response } from "express";
import { User } from "./model";
import { splitString } from "../../core/utils/splitString";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

interface Argument {
  name: string;
  lastName: string;
  email: string;
  password: string;
}


export async function postUser(req: Request, res: Response) {
  try {


    const user = await User.create(req.body)

    fetchCount(user)
      .then(data => {
        console.log(data.data);

        res.status(200).json(data.data)
      })
      .catch(error => {
        console.log(error);
      })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

