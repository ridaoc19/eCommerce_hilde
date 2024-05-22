import { Users } from 'src/users/entities/users.entity';
import {
  templateRegistre,
  TemplateRegistre,
  TypeTemplateRegistre,
} from './template';

export type SendEmail = Pick<Users, 'name' | 'email' | 'password'> & {
  tokenEmail?: string;
  type: TypeTemplateRegistre;
};

export async function sendEmail(param: TemplateRegistre): Promise<boolean> {
  try {
    // const { name, email, password } =
    // await this.usersService.findByEmail(getEmail);
    // const tokenEmail = '';
    // Construir el cuerpo del correo electrónico utilizando el template
    console.log(param, 'primero');
    const response = templateRegistre(param);

    console.log({ response });
    // const { error } = await this.resend.emails.send({
    //   from: this.configService.resend.email,
    //   to: [email],
    //   subject,
    //   html,
    // });

    // if (error) {
    //   console.error(error);
    //   return false;
    // }
    // console.log({ subject, html });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
