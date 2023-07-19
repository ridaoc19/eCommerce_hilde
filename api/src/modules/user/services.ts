import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, generateHashPassword } from "../../core/auth/bcryptUtils";
import { generateToken, verifyToken } from "../../core/auth/jwtUtils";
import { sendEmail } from "../../core/utils/email";
import { splitString } from "../../core/utils/splitString";
import { User } from "./model";
import { userCreatedVerified } from "./tools/userCreatedVerified";
import { userResetVerified } from "./tools/userResetVerified";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postRegistre(req: Request, res: Response) {
  try {
    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    const password = await generateHashPassword(temporaryPassword)
    const userDB = await User.create({ name: req.body.name, lastName: req.body.lastName, email: req.body.email, password, verified: false })
    if (!userDB) throw new Error(`errorString: se presento un inconveniente al realizar el registro</p>`)
    const user = await fetchCount({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email })
    const { _id, name, email, verified } = userDB;

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: 'registre' })
    if (!responseEmail) throw new Error(`errorString: <p><span>${name}</span> se presento un inconveniente al enviar la contraseña al correo <span>${email}</span></p>`)

    userCreatedVerified({ _id })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });

    res.status(200).json({ _id, name, email, verified })

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
    const { email: emailFront, password } = req.body;

    const userDB = await User.findOne({ email: emailFront })
    if (!userDB) throw new Error(`errorString: <p>Lo sentimos, el usuario (<span>${emailFront}</span>) no está registrado. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.</p>`)
    const { _id, name, lastName, email, verified } = userDB;
    const user = await fetchCount({ _id, name })


    const validatePass = await comparePassword(password, userDB.password)
    if (!validatePass) throw new Error(`errorString: <p>Lo sentimos, por favor verifique que haya ingresado correctamente sus credenciales.</p>`)

    let token = null
    if (userDB.verified) {
      token = generateToken({ _id, email, name })
    }

    res.status(200).json({ _id, name, lastName, email, verified, token })

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
    const { _id, name, lastName, email, verified } = userDB;
    const user = await fetchCount({ _id, name })

    res.status(200).json({ _id, name, lastName, email, verified })
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
    const userDB = await User.findOne({ email: req.body.email })
    if (!userDB) throw new Error(`errorString: <p>Lo sentimos, el usuario (<span>${req.body.email}</span>) no está registrado. Por favor, verifique que ha ingresado correctamente su correo electrónico o regístrese para crear una nueva cuenta.</p>`)

    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    const password = await generateHashPassword(temporaryPassword)

    const userUpdateDB = await User.findByIdAndUpdate(userDB._id, { password, verified: false }, { new: true })
    if (!userUpdateDB) throw new Error(`errorString: <p>Lamentablemente, se produjo un problema al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a>. Disculpa las molestias.</p>`)
    const { _id, name, lastName, email, verified } = userUpdateDB;
    const user = await fetchCount({ _id, name }) ///////////

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: "reset" })
    if (!responseEmail) throw new Error(`errorEmail: <p><span>${name}</span> se presento un inconveniente al enviar la contraseña al correo <span>${email}</span></p>`)

    userResetVerified({ _id })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });

    res.status(200).json({ _id, name, lastName, email, verified })
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
    const { _id: idFront, password: temporaryPassword } = req.body;

    const password = await generateHashPassword(temporaryPassword)

    const userDB = await User.findByIdAndUpdate({ _id: idFront }, { password, verified: true }, { new: true })
    if (!userDB) throw new Error(`errorString: <p>Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo <a href="mailto:hilde.ecommerce@outlook.com"}>hilde.ecommerce@outlook.com</a>. Disculpa las molestias.</p>`)
    const { _id, name, lastName, email, verified } = userDB;
    const user = await fetchCount({ _id, name })

    res.status(200).json({ _id, name, lastName, email, verified })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


