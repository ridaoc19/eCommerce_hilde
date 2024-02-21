import * as nodemailer from 'nodemailer';
import { User } from '../../../modules/user/tools/interface';
import { templateRegistre } from './template';

type SendEmail = Pick<User.Content, 'name' | 'email' | 'password' | 'type'> & { tokenEmail?: string }

export async function sendEmail({ name, email, password, type, tokenEmail }: SendEmail) {

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    const { subject, html }: { subject: string, html: string } = templateRegistre({ tokenEmail, name, password, type })

    const mailOptions = {
      from: process.env.EMAIL_SEND_FROM,
      to: email,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    return true
  } catch (error: unknown) {
    return false
  }
}

