import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ControllerController } from './controller/controller.controller';
import { ControllersController } from './controllers/controllers.controller';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController, ControllerController, ControllersController],
  providers: [UsersService]
})
export class UsersModule {}
