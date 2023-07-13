import nodemailer from 'nodemailer';
import { templateRegistre } from './template';
import { User } from '../../../modules/user/interface';

export async function sendEmail({name, email, password}: Pick<User, 'name' | 'email' | 'password'> ) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hilde.ecommerce@outlook.com',
      pass: 'Ecommerce2023',
    },
  });

  const mailOptions = {
    from: 'hilde.ecommerce@outlook.com',
    to: email,
    subject: 'Su cuenta',
    html: templateRegistre({name, password})
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
    return true
  } catch (error: unknown) {
    return false
  }
}

