import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { comparePassword } from '../../../core/auth/bcryptUtils';
import { StatusHTTP } from '../../../core/utils/enums';
import { errorHandlerArray } from '../../../core/utils/errorHandler';
import { validatorsLocal } from "../../../core/utils/validations/validatorsLocal";
import { User } from '../model';



const schemaLogin: { [key: string]: yup.Schema } = ({
  email: yup.string()
    .test('is-email', async function (value, ctx) {
      const userDB = await User.findOne({ email: value });

      if (!userDB) {
        return ctx.createError({ message: `Lo sentimos, el usuario (${value}) no está registrado. Por favor, verifique que ha ingresado correctamente sus credenciales o regístrese para crear una nueva cuenta.` });
      } else {
        return true;
      }
    }),
  password: yup.string()
    .test('is-password', async function (password, ctx) {

      const reqBody = ctx.options?.context?.reqBody;
      const userDB = await User.findOne({ email: reqBody?.email as string });

      if (!userDB) return true;

      const validatePass = await comparePassword(password!, userDB.password);

      if (!validatePass) {
        return ctx.createError({ message: `Lo sentimos, la contraseña no es válida.` });
      } else {
        return true;
      }
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
