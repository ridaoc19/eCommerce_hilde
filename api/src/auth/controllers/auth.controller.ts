import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { generateTokenJWT, PayloadToken } from 'src/common/utils/auth/jwtUtils';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto, LoginReturn } from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { LoginSwagger } from '../openApi/login.swagger';
import { AuthService } from '../service/auth.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    // private loginSwagger: LoginSwagger,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // ! LOGIN
  // @ApiOperation({ summary: 'Inicio de sesión con email y password' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Inicio de sesión exitoso',
  //   type: LoginSuccess,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Datos inválidos',
  //   type: LoginError400,
  // })
  // @ApiResponse({
  //   status: HttpStatus.CONFLICT,
  //   description: 'Contraseña errónea',
  //   type: LoginError409,
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: 'Error interno del servidor',
  //   type: LoginError500,
  // })
  @LoginSwagger.apiOperation()
  @LoginSwagger.apiResponse()
  // @UseGuards(AuthGuard('login'))
  @UseGuards(LoginAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request,
    @Body() payload: LoginDto,
  ): Promise<LoginReturn> {
    false && payload;
    const user = generateTokenJWT({
      user: req.user as Users,
      expiresIn: '1d',
    });
    return {
      statusCode: HttpStatus.OK,
      message: !user.verified
        ? `${user.name} debes cambiar la contraseña por una de tú preferencia`
        : !user.verifiedEmail
          ? `${user.name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${user.email}`
          : `¡Inicio de sesión exitoso! \n\n ${user?.name},Te damos la bienvenida de vuelta a nuestro sitio web.`,
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('token')
  async token(@Req() req: Request) {
    const token = req.user as PayloadToken;
    return await this.usersService.findOne(token.user_id);
  }
}
