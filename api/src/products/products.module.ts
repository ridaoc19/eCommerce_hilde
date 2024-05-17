import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ControllersController, ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
