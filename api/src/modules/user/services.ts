import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, generateHashPassword } from "../../core/auth/bcryptUtils";
import { generateToken, verifyToken } from "../../core/auth/jwtUtils";
import { sendEmail } from "../../core/utils/email";
import { splitString } from "../../core/utils/splitString";
import { User } from "./model";


function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postRegistre(req: Request, res: Response) {
  try {
    const { name, lastName, email } = req.body;
    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    // const { name, lastName, email, password: passFront } = req.body;

    const password = await generateHashPassword(temporaryPassword)

    const userDB = await User.create({ name, lastName, email, password, state: false })
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

export async function postLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email })
    if (!userDB) throw new Error(`errorString: <p>Lo sentimos, el usuario (<span>${email}</span>) no está registrado en nuestra página. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.</p>`)

    const validatePass = await comparePassword(password, userDB.password)
    if (!validatePass) throw new Error(`errorString: <p>Lo sentimos, por favor verifique que haya ingresado correctamente sus credenciales.</p>`)

    let token = null
    if (userDB.state) {
      token = generateToken({ _id: userDB._id, email: userDB.email, name: userDB.name })
    }

    res.status(200).json({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email, state: userDB.state, token })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


export async function postLoginToken(req: Request, res: Response) {
  try {
    const decoded = verifyToken(req.body.token);
    if (decoded?.token) throw new Error(`errorString: Invalid token`)

    const userDB = await User.findById({ _id: decoded._id })
    if (!userDB) throw new Error(`errorString: Invalid User`)
    const { _id, name, lastName, email, state } = userDB;

    res.status(200).json({ _id, name, lastName, email, state })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function postReset(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email })

    if (!userDB) throw new Error(`errorString: <p>Lo sentimos, el usuario (<span>${email}</span>) no está registrado en nuestra página. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.</p>`)

    const validatePass = await comparePassword(password, userDB.password)

    if (!validatePass) throw new Error(`errorString: <p>Lo sentimos, por favor verifique que haya ingresado correctamente sus credenciales.</p>`)

    res.status(200).json({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email, state: userDB.state })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}



export async function postPassChange(req: Request, res: Response) {
  try {
    const { _id, password: temporaryPassword } = req.body;

    const password = await generateHashPassword(temporaryPassword)

    const userDB = await User.findByIdAndUpdate(_id, { password, state: true }, { new: true })
    if (!userDB) throw new Error(`errorString: <p>Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a>. Disculpa las molestias.</p>`)

    res.status(200).json({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email, state: userDB.state })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


