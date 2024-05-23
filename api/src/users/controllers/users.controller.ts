import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UserError400,
  UserError409,
  UserError500,
  UserSuccess,
} from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // // ! Get All
  // @ApiOperation({ summary: 'Obtener todos los usuarios' })
  // @Public()
  // @ApiResponse({
  //   status: 200,
  //   description: 'Lista de usuarios recuperada con éxito',
  // })
  // @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // ! REGISTRE
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorización',
    required: false,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos necesarios para crear un usuario',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado con éxito',
    type: UserSuccess,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    type: UserError400,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El correo electrónico ya está en uso',
    type: UserError409,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
    type: UserError500,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto): Promise<UserSuccess> {
    try {
      const response = await this.usersService.create(payload);

      return {
        statusCode: HttpStatus.CREATED,
        message: `${payload.name} su cuenta fue registrada correctamente con su correo electrónico ${payload.email}`,
        data: response,
      };
    } catch (error) {
      console.log(error.code, error.message);
      if (error.code === '23505') {
        throw new ConflictException([
          `El correo electrónico ${payload.email} ya se encuentra registrado`,
        ]);
      }
      throw new InternalServerErrorException(['Error interno del servidor']);
    }
  }

  // ! CHANGE
  @Post('change')
  @HttpCode(HttpStatus.NO_CONTENT)
  change(@Body() payload) {
    const user = this.usersService.change(payload);
    if (user) {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: `${payload.name} el cambio de contraseña fue exitoso`,
      };
    } else {
      throw new BadRequestException(
        'Se presento un error al actualizar la contraseña, por favor inténtelo de nuevo o contactar con la tienda',
      );
    }
  }

  // ! RESET
  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async reset(@Body() payload) {
    const user = await this.usersService.reset(payload);

    if (user) {
      return {
        statusCode: HttpStatus.OK,
        message: `¡Restablecimiento exitoso! \n\n ${user.name}, revisa tu bandeja de entrada de correo electrónico ${user.email}. Pronto recibirás una contraseña temporal.`,
      };
    } else {
      throw new BadRequestException(
        'Se presento un error al actualizar la contraseña, por favor inténtelo de nuevo o contactar con la tienda',
      );
    }
  }
}

// try {
//   const user = req.user as Users;
//   const response = this.authService.generateJWT(user);

//   return response;
// } catch (error) {
//   console.error('Error en el login:', error);
//   throw new InternalServerErrorException(error.message);
// }
