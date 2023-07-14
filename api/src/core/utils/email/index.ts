import nodemailer from 'nodemailer';
import { User } from '../../../modules/user/interface';
import { templateRegistre } from './template';

export async function sendEmail({ name, email, password }: Pick<User, 'name' | 'email' | 'password'>) {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT!,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SEND_FROM,
    to: email,
    subject: 'Su cuenta',
    html: templateRegistre({ name, password })
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
    return true
  } catch (error: unknown) {
    return false
  }
}

