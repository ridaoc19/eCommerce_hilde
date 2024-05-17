import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { environments } from './environments';
import config from './config';

//? Los módulos son clases que nos ayudan agrupar conjuntos de controladores y servicios (users, products), ademas importar otros módulos
@Module({
  imports: [
    // ? configuración variables de entorno
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        URL_CLIENT: Joi.string().required(),
        SECRET_KEY_JWT: Joi.string().required(),
        SECRET_KEY_JWT_EMAIL: Joi.string().required(),
        EMAIL_RESEND: Joi.string().email().required(),
        ADMIN_USER_EMAIL: Joi.string().email().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ], //? Importación de otros módulos
  controllers: [], //? Importación de controladores
  providers: [], //? Importación de servicios
  exports: [], //? Exporta servicios para importarlos en otros Módulos y asi utilizarlos en los servicios
})
export class AppModule {}
