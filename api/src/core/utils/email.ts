import nodemailer from 'nodemailer';
import { templateRegistre } from './email/template';

export async function sendEmail({name, email}: {name: string, email: string}) {


  const emailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          color: #555;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenido/a</h1>
        <p>¡Hola! ${name} es tu usuario.</p>
        <p>${email}</p>

        </div>
    </body>
  </html>
`;


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
    // text: 'This is a test email from Nodemailer.',
    html: templateRegistre({name})
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

