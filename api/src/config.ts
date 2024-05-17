import { registerAs } from '@nestjs/config';

//? Para tipar variables de entorno -> de acá va a app.module.ts

export default registerAs('config', () => {
  return {
    postgres: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  };
});
