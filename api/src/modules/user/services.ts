import { Request, Response } from 'express';
import { ILike } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { generateHashPassword } from '../../core/auth/bcryptUtils';
import { generateToken, generateTokenEmail, verifyToken, verifyTokenEmail } from '../../core/auth/jwtUtils';
import { sendEmail } from '../../core/utils/email';
import { StatusHTTP } from '../../core/utils/send/enums';
import { errorHandlerCatch, errorHandlerRes } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { AppDataSource } from '../../data-source';
import UserEntity from './entity';
import { userCreatedVerified } from './tools/userCreatedVerified';
import { userEmailVerified } from './tools/userEmailVerified';
import { userResetVerified } from './tools/userResetVerified';

function fetchCount(info: any) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 8000)
  );
}

export default {
  async postLogin(req: Request, res: Response) {
    try {
      // const responseUserDB = await User.findOne({ email: req.body.email });
      const responseUserDB = await AppDataSource
        .getRepository(UserEntity)
        .findOne({ where: { email: req.body.email } });

      if (!responseUserDB) return

      let token = "";

      if (responseUserDB && responseUserDB.verified) {
        token = generateToken({ user_id: responseUserDB.user_id });
      }

      // await fetchCount({ id: responseUserDB?._id })

      successHandler({
        dataDB: [{ ...responseUserDB, token }],
        res,
        json: {
          status_code: 200,
          status: StatusHTTP.success_200,
          field: 'login',
          message: !responseUserDB.verified ? `${responseUserDB.name} debes cambiar la contraseña por una de tú preferencia` : !responseUserDB.verifiedEmail ? `${responseUserDB.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${responseUserDB.email}` : `¡Inicio de sesión exitoso! \n\n ${responseUserDB?.name},Te damos la bienvenida de vuelta a nuestro sitio web.`
        }
      })


    } catch (error: unknown) {
      errorHandlerCatch({ req, res, error })
    }
  },
  async postRegistre(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    try {
      const temporaryPassword: string = uuidv4().split("-", 1)[0];
      const password = await generateHashPassword(temporaryPassword)

      const insertedUser = userRepository.create([Object.assign(req.body, { password, verified: false, roles: req.body.email === process.env.ADMIN_USER_EMAIL ? 'super' : 'visitant' })]);
      await userRepository.save(insertedUser);
      if (!insertedUser) throw new Error(`se presento un inconveniente al realizar el registro`)
      const newUser = insertedUser[0]

      await fetchCount({ _id: newUser.user_id, name: newUser.name, lastName: newUser.lastName, email: newUser.email })

      const responseEmail: boolean = await sendEmail({ name: newUser.name, email: newUser.email, password: temporaryPassword, type: 'registre' })
      if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
        status: StatusHTTP.badRequest_400,
        status_code: 400,
        errors: [{ field: 'general', message: `${newUser.name} se presento un inconveniente al enviar la contraseña al correo ${newUser.email}` }],
        res, req
      })

      userCreatedVerified({ user_id: newUser.user_id })
        .catch(_error => {
          return errorHandlerRes<StatusHTTP.badRequest_400>({
            status: StatusHTTP.badRequest_400,
            status_code: 400,
            errors: [{ field: 'general', message: `${newUser.name} se presento un inconveniente al enviar los recordatorios de cambio contraseña` }],
            res, req
          })
        });

      successHandler({
        dataDB: [newUser], res,
        json: {
          field: 'registre', message: `¡Registro exitoso! \n\n Hola ${newUser.name}, tu registro ha sido exitoso. Por favor, revisa tu cuenta de correo electrónico ${newUser.email} donde encontrarás una contraseña temporal que podrás utilizar para iniciar sesión. Una vez que hayas ingresado a tu cuenta, podrás cambiar la contraseña por una de tu preferencia.
        `, status: StatusHTTP.success_200, status_code: 200
        },
      })

    } catch (error: unknown) {
      errorHandlerCatch({ req, res, error })
    }
  },
  async postPassChange(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const { email, password: temporaryPassword } = req.body;

    try {
      const password = await generateHashPassword(temporaryPassword)

      const userUpdate = await userRepository.findOne({ where: { email } })
      if (!userUpdate) return
      userUpdate.password = password;
      userUpdate.verified = true;
      await userRepository.save(userUpdate);
      // const userDB = await User.findOneAndUpdate({ email }, { password, verified: true }, { new: true })
      const userDB = userUpdate
      if (!userDB) throw new Error(`Se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
      await fetchCount({})

      successHandler({
        res, dataDB: [userDB], json: {
          field: 'change',
          message: `¡Contraseña cambiada con éxito! \n\n ${userDB.name} a partir de ahora, puedes iniciar sesión en tu cuenta con la nueva contraseña.`,
          status: StatusHTTP.updated_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },
  async postReset(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    try {
      const userUpdate = await userRepository.findOne({ where: { email: req.body.email } })
      // const userDB = await User.findOne({ email: req.body.email })
      if (!userUpdate) return

      const temporaryPassword: string = uuidv4().split("-", 1)[0];
      const password = await generateHashPassword(temporaryPassword)

      // const userUpdateDB = await User.findByIdAndUpdate(userDB!._id, { password, verified: false }, { new: true })
      userUpdate.password = password;
      userUpdate.verified = false;
      await userRepository.save(userUpdate);

      if (!userUpdate) throw new Error(`Se produjo un problema al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
      const { user_id, name, email } = userUpdate;
      await fetchCount({ user_id, name }) ///////////

      const responseEmail: boolean = await sendEmail({ name, email, password: temporaryPassword, type: "reset" })
      if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
        status: StatusHTTP.badRequest_400,
        status_code: 400,
        errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar la contraseña al correo ${email}` }],
        res, req
      })

      userResetVerified({ user_id, res })
        .catch(_error => {
          return errorHandlerRes<StatusHTTP.badRequest_400>({
            status: StatusHTTP.badRequest_400,
            status_code: 400,
            errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar los recordatorios cambio de contraseña` }],
            res, req
          })
        });

      successHandler({
        dataDB: [userUpdate], res, json: {
          field: 'reset',
          message: `¡Restablecimiento exitoso! \n\n ${userUpdate.name}, revisa tu bandeja de entrada de correo electrónico ${userUpdate.email}. Pronto recibirás una contraseña temporal.`,
          status: StatusHTTP.success_200,
          status_code: 200
        }
      })

    } catch (error) {
      errorHandlerCatch({ req, error, res })
    }
  },


  async getAccountAdmin(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    try {
      const dataUserAll = await userRepository.find({ where: { email: ILike(`${req.params.email}%`) }, take: 10 });
      if (!dataUserAll) return errorHandlerRes({ req, status: StatusHTTP.notFound_404, status_code: 404, res, errors: [{ field: 'accountAdmin', message: "Fallo el envió de usuarios" }] })
      successHandler({ dataDB: dataUserAll, res, json: { field: 'accountAdminGet', status: StatusHTTP.success_200, status_code: 200, message: "Se envío todos los usuarios" } })
    } catch (error) {
      errorHandlerCatch({ req, error, res })
    }
  },
  async postAccountInfo(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    try {
      let { user_id, name, lastName, email, newEmail, phone } = req.body;

      let verifiedEmailUpdate = true
      // enviar mensaje para validar correo 
      if (newEmail !== email) {
        let token = generateTokenEmail({ user_id, email: newEmail })
        const responseEmail: boolean = await sendEmail({ tokenEmail: token, name, email: newEmail, type: 'validateEmail' })
        if (!responseEmail) return errorHandlerRes<StatusHTTP.badRequest_400>({
          status: StatusHTTP.badRequest_400,
          status_code: 400,
          errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar el enlace para cambiar el correo ${newEmail}` }],
          res, req
        })
        userEmailVerified({ user_id, newEmail, res, req })
          .catch(_error => {
            return errorHandlerRes<StatusHTTP.badRequest_400>({
              status: StatusHTTP.badRequest_400,
              status_code: 400,
              errors: [{ field: 'general', message: `${name} se presento un inconveniente al enviar los recordatorios de cambio correo` }],
              res, req
            })
          });
        verifiedEmailUpdate = false
      }
      const userUpdate = await userRepository.findOne({ where: { user_id } })
      if (!userUpdate) return
      userUpdate.name = name;
      userUpdate.lastName = lastName;
      userUpdate.phone = phone;
      userUpdate.verifiedEmail = verifiedEmailUpdate
      await userRepository.save(userUpdate);
      // const userDB = await User.findByIdAndUpdate(_id, { name, lastName, phone, verifiedEmail: verifiedEmailUpdate }, { new: true })
      if (!userUpdate) throw new Error(`Se presento un inconveniente al realizar el registro`)
      await fetchCount({})

      successHandler({
        dataDB: [userUpdate], res, json: {
          field: 'accountInfo',
          message: verifiedEmailUpdate ? `${userUpdate.name} \n ¡Tus datos personales han sido actualizados!` : `¡Tus datos personales han sido actualizados! \n Cambiaste tu correo, recibirás un enlace para verificarlo. Si no lo verificas en 10 minutos, seguirás usando tu correo actual y no podrás iniciar sesión hasta que lo hagas.`,
          status: StatusHTTP.updated_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },

  async postAccountPass(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);

    try {
      let { user_id, newPassword: temporaryPassword } = req.body;
      const password = await generateHashPassword(temporaryPassword)
      // const userDB = await User.findByIdAndUpdate({ _id }, { password, verified: true }, { new: true })
      const userUpdate = await userRepository.findOne({ where: { user_id } })
      if (!userUpdate) return
      userUpdate.password = password;
      userUpdate.verified = true
      await userRepository.save(userUpdate);

      if (!userUpdate) throw new Error(`Lamentablemente, se produjo un problema al intentar cambiar la contraseña. Por favor, inténtalo de nuevo más tarde o ponte en contacto con nosotros al correo hilde.ecommerce@outlook.com. Disculpa las molestias.`)
      await fetchCount({})
      successHandler({
        dataDB: [userUpdate], res, json: {
          field: 'accountPass',
          message: `${userUpdate.name} \n ¡Contraseña cambiada exitosamente!`,
          status: StatusHTTP.updated_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },


  async putAccountAdmin(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);

    try {
      let { roles } = req.body;
      const { user_id } = req.params

      let previousRoles = ''
      const userUpdate = await userRepository.findOne({ where: { user_id } })
      if (!userUpdate) return
      previousRoles = userUpdate.roles
      userUpdate.roles = roles
      await userRepository.save(userUpdate);
      // await User.findByIdAndUpdate(_id, { roles }, { new: true })
      const userDB = await userRepository.find()
      if (!userDB) throw new Error(`Se presento un inconveniente en actualizar los datos`)
      await fetchCount({})

      successHandler({
        dataDB: userDB, res, json: {
          field: 'accountAdminPut',
          message: `Se actualizo los roles de ${userUpdate.name} ${userUpdate.lastName} correctamente \n paso de tener "${previousRoles}" a "${userUpdate.roles}"`,
          status: StatusHTTP.updated_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },

  async deleteAccountAdmin(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);

    try {
      let { user_id } = req.params;
      // await User.findByIdAndDelete(_id)
      const userDelete = await userRepository.findOne({ where: { user_id } })
      if (!userDelete) return
      await userRepository.softRemove(userDelete);

      if (!userDelete) throw new Error(`Se presento un inconveniente en actualizar los datos`)
      await fetchCount({})

      successHandler({
        dataDB: [], res, json: {
          field: 'accountAdminDelete',
          message: `Se elimino el usuario ${userDelete.name} ${userDelete.lastName} correctamente`,
          status: StatusHTTP.success_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },


  async postLoginToken(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);

    try {
      const decoded = verifyToken(req.body.token);
      const user = await userRepository.findBy({ user_id: decoded.user_id })

      successHandler({
        dataDB: user, res, json: {
          field: 'token',
          status_code: 200,
          status: StatusHTTP.success_200,
          message: 'Inicio sesión exitoso con token'
        }
      })

    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },
  async postVerifyEmail(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(UserEntity);

    try {
      const decoded: { user_id: string, email: string, token?: boolean } = verifyTokenEmail(req.body.tokenEmail);

      const userUpdate = await userRepository.findOne({ where: { user_id: decoded.user_id } })
      if (!userUpdate) return
      userUpdate.email = decoded.email;
      userUpdate.verifiedEmail = true;
      await userRepository.save(userUpdate);
      // const userDB = await User.findByIdAndUpdate({ _id: decoded._id }, { email: decoded.email, verifiedEmail: true }, { new: true })
      if (!userUpdate) throw new Error(`Se produjo un error al validar el nuevo correo electrónico, por favor solicita el cambio de correo nuevamente`)
      successHandler({
        dataDB: [userUpdate], res, json: {
          field: 'verifyEmail',
          message: `${userUpdate.name} se realizo la validación del correo electrónico "${userUpdate.email}"`,
          status: StatusHTTP.success_200,
          status_code: 200
        }
      })
    } catch (error: unknown) {
      errorHandlerCatch({ req, error, res })
    }
  },



























  async createUser(req: Request, res: Response) {
    try {
      const newUser = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([req.body])
        .execute()

      successHandler({
        res,
        dataDB: [newUser],
        json: {
          field: 'user_create',
          message: 'Usuario creado',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ req, error, res });
    }
  },
  async updateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const updateUser = await AppDataSource
        .createQueryBuilder()
        .update(UserEntity)
        .set(req.body)
        .where({ user_id })
        .execute()

      if (!updateUser) {
        return errorHandlerRes({ req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_edit', message: 'No se actualizo el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [updateUser],
        json: {
          field: 'user_update',
          message: 'Usuario actualizado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ req, error, res });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const deleteUser = await AppDataSource
        .getRepository(UserEntity)
        .createQueryBuilder()
        .softDelete()
        .where({ user_id })
        .execute();

      if (!deleteUser) {
        return errorHandlerRes({ req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_delete', message: 'No se pudo eliminar el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [deleteUser],
        json: {
          field: 'user_delete',
          message: 'Usuario eliminado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ req, error, res });
    }
  },
  async restoreUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const deleteUser = await AppDataSource
        .getRepository(UserEntity)
        .createQueryBuilder()
        .restore()
        .where({ user_id })
        .execute();

      if (!deleteUser) {
        return errorHandlerRes({ req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_delete', message: 'No se pudo restaurar el usuario' }] })
      }

      successHandler({
        res,
        dataDB: [deleteUser],
        json: {
          field: 'user_restore',
          message: 'Usuario restaurado',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ req, error, res });
    }
  },
  async getUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      const userRepository = AppDataSource.getRepository(UserEntity);

      const existingUser = await userRepository.findOne({ where: { user_id } });

      if (!existingUser) {
        return errorHandlerRes({ req, res, status_code: 404, status: StatusHTTP.notFound_404, errors: [{ field: 'user_get', message: 'Usuario no encontrado' }] })
      }

      successHandler({
        res,
        dataDB: [existingUser],
        json: {
          field: 'user_get',
          message: 'Usuario obtenido',
          status_code: 200,
          status: StatusHTTP.success_200,
        },
      });
    } catch (error) {
      errorHandlerCatch({ req, error, res });
    }
  },
};
