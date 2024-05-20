import { Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Users } from 'src/users/entities/users.entity';
import { AuthService } from '../service/auth.service';
import {
  LoginError400,
  LoginError409,
  LoginError500,
  LoginSuccess,
} from '../dtos/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as Users;
    return this.authService.generateJWT(user);
  }
}
