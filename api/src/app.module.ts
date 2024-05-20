import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import config, { environments } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
        API_KEY: Joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
