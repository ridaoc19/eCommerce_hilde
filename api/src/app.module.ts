import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersModule, ProductsModule, DatabaseModule],
  // controles
  controllers: [AppController, UsersController],
  // servicios
  providers: [AppService],
  // exports sirve para intercomunicar con otros modulos
  // exports;
})
export class AppModule {}
