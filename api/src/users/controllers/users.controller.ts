import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
@ApiTags('Usuarios') // Etiqueta para el grupo de rutas
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción de la operación
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios recuperada con éxito',
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción de la operación
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorización',
    required: false, // Si el header es requerido
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos necesarios para crear un usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado con éxito',
    type: CreateUserResponse,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Post()
  create(@Body() payload: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(payload);
  }

  // @Get(':user_id')
  // get(@Param('user_id', ParseIntPipe) user_id: string) {
  //   return this.usersService.findOne(user_id);
  // }

  // @Put(':user_id')
  // update(
  //   @Param('user_id', ParseIntPipe) user_id: string,
  //   @Body() payload: UpdateUserDto,
  // ) {
  //   return this.usersService.update(user_id, payload);
  // }

  // @Delete(':user_id')
  // remove(@Param('user_id', ParseIntPipe) user_id: number) {
  //   return this.usersService.remove(+user_id);
  // }
}
