import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AddCronJob, EmailService } from 'src/email/services/email.service';
import { Users } from 'src/users/entities/users.entity';
import {
  LoginError400,
  LoginError409,
  LoginError500,
  LoginSuccess,
} from '../dtos/auth.dto';
import { AuthService } from '../service/auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  // ! LOGIN
  @ApiOperation({ summary: 'Inicio de sesión con email y password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inicio de sesión exitoso',
    type: LoginSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    type: LoginError400,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Contraseña errónea',
    type: LoginError409,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
    type: LoginError500,
  })
  @UseGuards(AuthGuard('local'))
  // @SendEmail(TypeEmail.CREATE_USER)
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const user = req.user as Users;
      const response = this.authService.generateJWT(user);
      await this.emailService.addCronJob({
        type: AddCronJob.Reset,
        email: response.user.email,
        passwordTemporality: '1234',
      });
      return response;
    } catch (error) {
      console.error('Error en el login:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
