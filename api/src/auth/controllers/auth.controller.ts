import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { generateTokenJWT, PayloadToken } from 'src/common/utils/auth/jwtUtils';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import {
  LoginError400,
  LoginError409,
  LoginError500,
  LoginSuccess,
} from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../service/auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
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
  @UseGuards(AuthGuard('login'))
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const user = generateTokenJWT(req.user as Users);
      return user;
    } catch (error) {
      console.error('Error en el login:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('token')
  async token(@Req() req: Request) {
    const token = req.user as PayloadToken;
    return await this.usersService.findOne(token.user_id);
  }
}
