import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { comparePassword } from '../../../core/auth/bcryptUtils';
import { StatusHTTP } from '../../../core/utils/enums';
import { errorHandlerArray } from '../../../core/utils/send/errorHandler';
import { validatorsLocal } from "../../../core/utils/validations/validatorsLocal";
import { User } from '../model';
import { verifyToken } from '../../../core/auth/jwtUtils';



const schemaLogin: { [key: string]: yup.Schema } = ({
  email: yup.string().test('is-email', async function (email, ctx) {
    const options = ctx.options?.context
    const userDB = await User.findOne({ email });

    switch (options?.route) {
      case 'login':
        if (!userDB) return ctx.createError({ message: `Lo sentimos, el usuario (${email}) no está registrado. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.` });
        break;

      case 'registre':
        if (userDB?.email === options.reqBody.email) return ctx.createError({ message: `Lo sentimos, el correo electrónico (${email}) ya se encuentra registrado. Por favor, verifique que ha ingresado correctamente el correo con el que desea registrarse` });
        break;

      default:
        break;
    }

    return true;
  }),
  password: yup.string().test('is-password', async function (password, ctx) {
    const options = ctx.options?.context
    const userDB = await User.findOne({ email: options?.reqBody?.email as string });
    if (!userDB) return true;

    switch (options?.route) {
      case 'login':
        const validatePass = await comparePassword(password!, userDB.password);
        if (!validatePass) return ctx.createError({ message: `Lo sentimos, la contraseña no es válida.` });
        break;

      case 'change':
        const validatePassChange = await comparePassword(password!, userDB.password);
        if (validatePassChange) return ctx.createError({ message: `Lo sentimos, la contraseña no puede ser igual a la anterior.` });
        break;

      default:
        break;
    }
    return true;
  }),
  token: yup.string().test('is-password', async function (token, ctx) {
    if (!token) return true

    const decoded = verifyToken(token);
    if (decoded?.token) {
      return ctx.createError({
        message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
      });
    }

    const userDB = await User.findById({ _id: decoded._id });

    if (!userDB) {
      return ctx.createError({
        message: 'Error al iniciar sesión. Por favor, inicia sesión de nuevo.',
      });
    }

    return true
  }),
  newPassword: yup.string().test('is-password', async function (newPassword, ctx) {
    const options = ctx.options?.context
    if (newPassword !== options?.reqBody?.password) return ctx.createError({ message: `las contraseñas deben coincidir.` });
    return true
  }),
});

export async function middlewareLogin(req: Request, res: Response, next: NextFunction) {
  const errors = await validatorsLocal({ req, validationSchemas: schemaLogin })

  if (errors.length > 0) {
    errorHandlerArray<StatusHTTP.unauthorized_401>({
      res,
      json: {
        status_code: 401,
        status: StatusHTTP.unauthorized_401,
        errors
      }
    })
  } else {
    next()
  }

}
