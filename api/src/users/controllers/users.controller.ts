import {
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
import { AddCronJob, EmailService } from 'src/email/services/email.service';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private emailServices: EmailService,
  ) {}

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

      this.emailServices.addCronJob({
        type: AddCronJob.Registre,
        email: response.email,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: `${payload.name} su cuenta fue registrada correctamente con su correo electrónico ${payload.email}`,
        data: response,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException([
          `El correo electrónico ${payload.email} ya se encuentra registrado`,
        ]);
      }
      throw new InternalServerErrorException(['Error interno del servidor']);
    }
  }
}
