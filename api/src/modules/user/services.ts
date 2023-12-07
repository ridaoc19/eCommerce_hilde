import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { generateHashPassword } from "../../core/auth/bcryptUtils";
import { generateToken, generateTokenEmail, verifyToken, verifyTokenEmail } from "../../core/auth/jwtUtils";
import { sendEmail } from "../../core/utils/email";
import { StatusHTTP } from "../../core/utils/enums";
import { errorHandlerCatch, errorHandlerRes } from "../../core/utils/send/errorHandler";
import { successHandler } from "../../core/utils/send/successHandler";
import { splitString } from "../../core/utils/splitString";
import { User } from "./model";
import { userCreatedVerified } from "./tools/userCreatedVerified";
import { userEmailVerified } from "./tools/userEmailVerified";
import { userResetVerified } from "./tools/userResetVerified";

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

    successHandler({
      dataDB: [responseUserDB!],
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

    successHandler({
      dataDB: [dataDB], filterAdd: [], filterDelete: ['password'], res, json: {
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
    if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
      status: StatusHTTP.badRequest_400,
      status_code: 400,
      errors: [{ field: 'general', message: `${userDB.name} se presento un inconveniente al enviar la contraseña al correo ${userDB.email}` }],
      res
    })

    userCreatedVerified({ _id: userDB._id })
      .catch(_error => {
        return errorHandlerRes<StatusHTTP.badRequest_400>({
          status: StatusHTTP.badRequest_400,
          status_code: 400,
          errors: [{ field: 'general', message: `${userDB.name} se presento un inconveniente al enviar los recordatorios de cambio contraseña` }],
          res
        })
      });

    successHandler({
      dataDB: [userDB], filterAdd: [], filterDelete: ['password'], res,
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
      res, dataDB: [userDB], filterAdd: [], filterDelete: ['password'], json: {
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
    const temporaryPassword: string = uuidv4().split("-", 1)[0];
    const password = await generateHashPassword(temporaryPassword)

    const userUpdateDB = await User.findByIdAndUpdate(userDB!._id, { password, verified: false }, { new: true })
    if (!userUpdateDB) throw new Error(`Se produjo un problema al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
    const { _id, name, email } = userUpdateDB;
    await fetchCount({ _id, name }) ///////////

    const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: "reset" })
    if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
      status: StatusHTTP.badRequest_400,
      status_code: 400,
      errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar la contraseña al correo ${email}` }],
      res
    })

    userResetVerified({ _id, res })
      .catch(_error => {
        return errorHandlerRes<StatusHTTP.badRequest_400>({
          status: StatusHTTP.badRequest_400,
          status_code: 400,
          errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar los recordatorios cambio de contraseña` }],
          res
        })
      });

    successHandler({
      dataDB: [userUpdateDB], filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'reset',
        message: 'Restablecimiento de contraseña exitoso',
        status: StatusHTTP.success_200,
        status_code: 200
      }
    })

  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

export async function postAccountInfo(req: Request, res: Response) {
  try {
    let { _id, name, lastName, email, newEmail, phone } = req.body;

    let verifiedEmailUpdate = true
    // enviar mensaje para validar correo 
    if (newEmail !== email) {
      let token = generateTokenEmail({ _id, email: newEmail })
      const responseEmail: boolean = await sendEmail({ tokenEmail: token, name, email: newEmail, type: 'validateEmail' })
      if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
        status: StatusHTTP.badRequest_400,
        status_code: 400,
        errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar el enlace para cambiar el correo ${newEmail}` }],
        res
      })
      userEmailVerified({ _id, newEmail, res })
        .catch(_error => {
          return errorHandlerRes<StatusHTTP.badRequest_400>({
            status: StatusHTTP.badRequest_400,
            status_code: 400,
            errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar los recordatorios de cambio correo` }],
            res
          })
        });
      verifiedEmailUpdate = false
    }
    const userDB = await User.findByIdAndUpdate(_id, { name, lastName, phone, verifiedEmail: verifiedEmailUpdate }, { new: true })
    if (!userDB) throw new Error(`Se presento un inconveniente al realizar el registro`)
    await fetchCount({})

    successHandler({
      dataDB: [userDB], filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'accountInfo',
        message: 'Se actualizo la información con éxito',
        status: StatusHTTP.updated_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

export async function postAccountPass(req: Request, res: Response) {
  try {
    let { _id, newPassword: temporaryPassword } = req.body;
    const password = await generateHashPassword(temporaryPassword)
    const userDB = await User.findByIdAndUpdate({ _id }, { password, verified: true }, { new: true })
    if (!userDB) throw new Error(`Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
    await fetchCount({})
    successHandler({
      dataDB: [userDB], filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'accountPass',
        message: 'contraseña cambiada con éxito',
        status: StatusHTTP.updated_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

export async function postVerifyEmail(req: Request, res: Response) {
  try {
    const decoded: { _id: string, email: string, token?: boolean } = verifyTokenEmail(req.body.tokenEmail);

    const userDB = await User.findByIdAndUpdate({ _id: decoded._id }, { email: decoded.email, verifiedEmail: true }, { new: true })
    if (!userDB) throw new Error(`Se produjo un error al validar el nuevo correo electrónico, por favor solicita el cambio de correo nuevamente`)
    successHandler({
      dataDB: [userDB], filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'verifyEmail',
        message: 'Se valido el correo electrónico con éxito',
        status: StatusHTTP.success_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

export async function getAccountAdmin(_req: Request, res: Response) {
  try {
    const dataUserAll = await User.find()
    if (!dataUserAll) return errorHandlerRes({ status: StatusHTTP.notFound_404, status_code: 404, res, errors: [{ field: 'accountAdmin', message: "Fallo el envió de usuarios" }] })
    successHandler({ dataDB: dataUserAll, filterAdd: [], filterDelete: ['password'], res, json: { field: 'accountAdminGet', status: StatusHTTP.success_200, status_code: 200, message: "Se envío todos los usuarios" } })
  } catch (error) {
    errorHandlerCatch({ error, res })
  }
}

export async function putAccountAdmin(req: Request, res: Response) {
  try {
    let { _id, roles } = req.body;

    await User.findByIdAndUpdate(_id, { roles }, { new: true })
    const userDB = await User.find()
    if (!userDB) throw new Error(`Se presento un inconveniente en actualizar los datos`)
    await fetchCount({})

    successHandler({
      dataDB: userDB, filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'accountAdminPut',
        message: 'Se actualizo la información del admin con éxito',
        status: StatusHTTP.updated_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

export async function deleteAccountAdmin(req: Request, res: Response) {
  try {
    let { _id } = req.params;
    await User.findByIdAndDelete(_id)
    const userDB = await User.find()
    if (!userDB) throw new Error(`Se presento un inconveniente en actualizar los datos`)
    await fetchCount({})

    successHandler({
      dataDB: userDB, filterAdd: [], filterDelete: ['password'], res, json: {
        field: 'accountAdminDelete',
        message: 'Se elimino el usuario con éxito',
        status: StatusHTTP.success_200,
        status_code: 200
      }
    })
  } catch (error: unknown) {
    errorHandlerCatch({ error, res })
  }
}

