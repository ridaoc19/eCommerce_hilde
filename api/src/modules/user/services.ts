import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { generateHashPassword } from "../../core/auth/bcryptUtils";
import { generateToken, generateTokenEmail, verifyToken, verifyTokenEmail } from "../../core/auth/jwtUtils";
import { sendEmail } from "../../core/utils/email";
import { StatusHTTP } from "../../core/utils/enums";
import { successHandler } from "../../core/utils/send/successHandler";
import { splitString } from "../../core/utils/splitString";
import { User } from "./model";
import { userCreatedVerified } from "./tools/userCreatedVerified";
import { userEmailVerified } from "./tools/userEmailVerified";
import { userResetVerified } from "./tools/userResetVerified";
import { errorHandlerCatch } from "../../core/utils/send/errorHandler";

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export async function postLogin(req: Request, res: Response) {
  try {
    const responseUserDB = await User.findOne({ email: req.body.email });

    let token = "";

    if (responseUserDB && responseUserDB.verified) {
      token = generateToken({ _id: responseUserDB._id });
    }

    successHandler<StatusHTTP.success_200>({
      dataDB: responseUserDB!,
      filterAdd: [{ key: 'token', value: token }],
      filterDelete: ['password'],
      res,
      json: {
        status_code: 200,
        status: StatusHTTP.success_200,
        field: 'login',
        message: 'Inicio de sesión exitoso'
      }
    })


  } catch (error: unknown) {
    errorHandlerCatch({ res, error })
  }
}

export async function postLoginToken(req: Request, res: Response) {
  try {
    const decoded = verifyToken(req.body.token);
    const responseDB = await User.findById({ _id: decoded._id })
    const dataDB = responseDB!
    // await fetchCount({ _id, name })

    successHandler<StatusHTTP.success_200>({
      dataDB, filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'token',
        status_code: 200,
        status: StatusHTTP.success_200,
        message: 'Inicio sesión exitoso con token'
      }
    })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function postRegistre(req: Request, res: Response) {
  try {
    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    const password = await generateHashPassword(temporaryPassword)
    const userDB = await User.create(Object.assign(req.body, { password, verified: false }))
    if (!userDB) throw new Error(`se presento un inconveniente al realizar el registro`)
    await fetchCount({ _id: userDB._id, name: userDB.name, lastName: userDB.lastName, email: userDB.email })

    const responseEmail: boolean = await sendEmail({ name: userDB.name, email: userDB.email, password: temporaryPassword, type: 'registre' })
    if (!responseEmail) throw new Error(`${userDB.name} se presento un inconveniente al enviar la contraseña al correo ${userDB.email}`)

    userCreatedVerified({ _id: userDB._id })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });

    successHandler({
      dataDB: userDB, filterAdd: [], filterDelete: ['password'], res,
      json: { field: 'registre', message: 'registro exitoso', status: StatusHTTP.success_200, status_code: 200 },
    })

  } catch (error: unknown) {
    errorHandlerCatch({ res, error })
  }
}

export async function postPassChange(req: Request, res: Response) {
  try {
    const { email, password: temporaryPassword } = req.body;

    const password = await generateHashPassword(temporaryPassword)

    const userDB = await User.findOneAndUpdate({ email }, { password, verified: true }, { new: true })
    if (!userDB) throw new Error(`Se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
    await fetchCount({})

    successHandler({
      res, dataDB: userDB, filterAdd: [], filterDelete: ['password'], json: {
        field: 'change',
        message: 'Cambio de contraseña fue exitoso',
        status: StatusHTTP.updated_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
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
    const { _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses } = userUpdateDB;
    await fetchCount({ _id, name }) ///////////

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: "reset" })
    if (!responseEmail) throw new Error(`errorEmail: ${name} se presento un inconveniente al enviar la contraseña al correo ${email}`)

    userResetVerified({ _id })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });

    res.status(200).json({ _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses })
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
    if (req.body.components === "information") { // cambia información
      let { _id: _idF, name: nameF, lastName: lastNameF, email: emailF, previousEmail, phone: phoneF, components } = req.body;

      let verifiedEmailUpdate = true
      // enviar mensaje para validar correo 
      if (emailF !== previousEmail) {
        let token = generateTokenEmail({ _id: _idF, email: emailF })
        const responseEmail: boolean = await sendEmail({ tokenEmail: token, name: nameF, email: emailF, type: 'validateEmail' })
        if (!responseEmail) throw new Error(`errorEmail: ${nameF} se presento un inconveniente al enviar el enlace para cambiar el correo ${emailF}`)
        userEmailVerified({ _id: _idF, newEmail: emailF })
          .catch(error => {
            console.error('Ocurrió un error:', error);
          });
        verifiedEmailUpdate = false
      }
      const userDB = await User.findByIdAndUpdate(_idF, { name: nameF, lastName: lastNameF, phone: phoneF, verifiedEmail: verifiedEmailUpdate }, { new: true })
      if (!userDB) throw new Error(`errorString: se presento un inconveniente al realizar el registro`)
      const { _id, name, lastName, email, phone, password, verified, verifiedEmail, roles, items, addresses } = userDB;
      await fetchCount({})
      res.status(200).json({ _id, name, lastName, email, phone, password, verified, verifiedEmail, roles, items, addresses, components })

    } else if (req.body.components === "password") { // restablece contraseña
      let { _id: _idF, password: temporaryPassword, components } = req.body;
      const password = await generateHashPassword(temporaryPassword)
      const userDB = await User.findByIdAndUpdate({ _id: _idF }, { password, verified: true }, { new: true })
      if (!userDB) throw new Error(`errorString: Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
      const { _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses } = userDB;
      await fetchCount({})
      res.status(200).json({ _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses, components })
    }
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}

export async function postVerifyEmail(req: Request, res: Response) {
  try {
    const decoded: { _id: string, email: string, token?: boolean } = verifyTokenEmail(req.body.tokenEmail);
    if (decoded?.token) throw new Error(`errorString: Invalid token Email`)

    const userDB = await User.findByIdAndUpdate({ _id: decoded._id }, { email: decoded.email, verifiedEmail: true }, { new: true })
    if (!userDB) throw new Error(`errorString: Invalid User`)
    const { _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses } = userDB;
    res.status(200).json({ _id, name, lastName, email, phone, verified, verifiedEmail, roles, items, addresses })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: splitString(error) });
    } else {
      res.status(500).json({ error: `Error desconocido: ${error}` });
    }
  }
}


