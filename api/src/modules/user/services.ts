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
    const userDB = await User.create({ name: req.body.name, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone, password, verified: false })
    if (!userDB) throw new Error(`errorString: se presento un inconveniente al realizar el registro`)
    const user = await fetchCount({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email })
    const { _id, name, email, verified } = userDB;

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: 'registre' })
    if (!responseEmail) throw new Error(`errorString: ${name} se presento un inconveniente al enviar la contraseña al correo ${email}`)

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
    if (!userDB) throw new Error(`errorString: Lo sentimos, el usuario (${emailFront}) no está registrado. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.`)
    const { _id, name, lastName, email, phone, verified, roles } = userDB;
    // const user = await fetchCount({ _id, name })


    const validatePass = await comparePassword(password, userDB.password)
    if (!validatePass) throw new Error(`errorString: Lo sentimos, por favor verifique que haya ingresado correctamente sus credenciales.`)

    let token = null
    if (userDB.verified) {
      token = generateToken({ _id })
    }

    res.status(200).json({ _id, name, lastName, email, phone, verified, token, roles })

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
    const { _id, name, lastName, email, phone, verified, roles } = userDB;
    // const user = await fetchCount({ _id, name })

    res.status(200).json({ _id, name, lastName, email, phone, verified, roles })
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
    if (!userDB) throw new Error(`errorString: Lo sentimos, el usuario (${req.body.email}) no está registrado. Por favor, verifique que ha ingresado correctamente su correo electrónico o regístrese para crear una nueva cuenta.`)

    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    const password = await generateHashPassword(temporaryPassword)

    const userUpdateDB = await User.findByIdAndUpdate(userDB._id, { password, verified: false }, { new: true })
    if (!userUpdateDB) throw new Error(`errorString: Lamentablemente, se produjo un problema al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
    const { _id, name, lastName, email, verified } = userUpdateDB;
    const user = await fetchCount({ _id, name }) ///////////

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: "reset" })
    if (!responseEmail) throw new Error(`errorEmail: ${name} se presento un inconveniente al enviar la contraseña al correo ${email}`)

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
    if (!userDB) throw new Error(`errorString: Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
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

export async function postAccount(req: Request, res: Response) {
  try {
    if (req.body.components === "information") {
      let { _id: _idF, name: nameF, lastName: lastNameF, email: emailF, phone: phoneF, components } = req.body;
      const userDB = await User.findByIdAndUpdate(_idF,
        { name: nameF, lastName: lastNameF, email: emailF, phone: phoneF },
        { new: true })
      if (!userDB) throw new Error(`errorString: se presento un inconveniente al realizar el registro`)
      const { _id, name, lastName, email, phone, verified, roles } = userDB;
      const user = await fetchCount({ _id, name })
      res.status(200).json({ _id, name, lastName, email, phone, verified, roles, components })

    } else if (req.body.components === "password") {
      let { _id: _idF, password: temporaryPassword, components } = req.body;

      const password = await generateHashPassword(temporaryPassword)
      const userDB = await User.findByIdAndUpdate({ _id: _idF }, { password, verified: true }, { new: true })
      if (!userDB) throw new Error(`errorString: Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
      const { _id, name, lastName, email, phone, verified, roles } = userDB;
      const user = await fetchCount({ _id, name })
      res.status(200).json({ _id, name, lastName, email, phone, verified, roles, components })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

