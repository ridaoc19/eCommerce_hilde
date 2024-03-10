import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { comparePassword } from '../../../core/auth/bcryptUtils';
import { verifyToken, verifyTokenEmail } from '../../../core/auth/jwtUtils';
import { StatusHTTP } from '../../../core/utils/send/enums';
import { errorHandlerArray } from '../../../core/utils/send/errorHandler';
import { validatorsLocal } from '../../../core/utils/validations/validatorsLocal';
import { AppDataSource } from '../../../data-source';
import UserEntity from '../entity';



const schemaLogin: { [key: string]: yup.Schema } = ({
  email: yup.string().test('is-email', async function (email, ctx) {
    const options = ctx.options?.context
    const userDB = await AppDataSource
      .getRepository(UserEntity)
      .findOne({ where: { email } });

    switch (options?.route) {
      case 'login':
        if (!userDB) return ctx.createError({ message: `Lo sentimos, el usuario (${email}) no está registrado. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.` });
        break;

      case 'reset':
        if (!userDB) return ctx.createError({ message: `Lo sentimos, el usuario (${email}) no está registrado. Por favor, verifique que ha ingresado correctamente su correo electrónico o regístrese para crear una cuenta.` });
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
    const userDB = await AppDataSource
      .getRepository(UserEntity)
      .findOne({ where: { email: options?.reqBody?.email as string } });
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
  token: yup.string().test('is-token', async function (token, ctx) {
    if (!token) return true

    const decoded = verifyToken(token);
    if (decoded?.token) {
      return ctx.createError({
        message: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
      });
    }

    const userDB = await AppDataSource
      .getRepository(UserEntity)
      .findOne({ where: { user_id: decoded.user_id } });

    if (!userDB) {
      return ctx.createError({
        message: 'Error al iniciar sesión. Por favor, inicia sesión de nuevo.',
      });
    }

    return true
  }),
  newPassword: yup.string().test('is-newPassword', async function (newPassword, ctx) {
    const options = ctx.options?.context
    if (newPassword !== options?.reqBody?.password) return ctx.createError({ message: `las contraseñas deben coincidir.` });
    return true
  }),
  tokenEmail: yup.string().test('is-tokenEmail', async function (tokenEmail, ctx) {
    if (!tokenEmail) return true

    const decoded = verifyTokenEmail(tokenEmail);
    if (decoded?.token) {
      return ctx.createError({ message: 'La validación no fue exitosa, por favor solicita el cambio de correo nuevamente', });
    }
    return true
  }),
});

export async function middlewareLogin(req: Request, res: Response, next: NextFunction) {
  const errors = await validatorsLocal({ req, validationSchemas: schemaLogin })

  if (errors.length > 0) {
    errorHandlerArray<StatusHTTP.unauthorized_401>({
      req,
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
