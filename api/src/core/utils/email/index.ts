import { Resend } from 'resend';
import { User } from '../../../modules/user/tools/interface';
import { templateRegistre } from './template';

// Crear una instancia de Resend con tu clave de API
const resend = new Resend(process.env.EMAIL_KEY_RESEND);

// Definir el tipo para los datos de envío de correo electrónico
type SendEmail = Pick<User.Content, 'name' | 'email' | 'password' | 'type'> & { tokenEmail?: string };

export async function sendEmail({ name, email, password, type, tokenEmail }: SendEmail) {
  try {
    // Construir el cuerpo del correo electrónico utilizando el template
    const { subject, html }: { subject: string, html: string } = templateRegistre({ tokenEmail, name, password, type });

    const { data, error } = await resend.emails.send({
      from: 'ecommerce.hilde@ridaoc.es',
      to: [email],
      subject,
      html,
    });

    if (error) {
      console.log(error)
      return false
    }

    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

// export async function sendEmail({ name, email, password, type, tokenEmail }: SendEmail) {

//   try {

//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: +process.env.EMAIL_PORT!,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_AUTH_USER,
//         pass: process.env.EMAIL_AUTH_PASS,
//       },
//     });

//     const { subject, html }: { subject: string, html: string } = templateRegistre({ tokenEmail, name, password, type })

//     const mailOptions = {
//       from: process.env.EMAIL_SEND_FROM,
//       to: email,
//       subject,
//       html
//     };

//     await transporter.sendMail(mailOptions);
//     return true
//   } catch (error: unknown) {
//     console.log(error, "tiene error email")
//     return false
//   }
// }

