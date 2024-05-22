import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserResponse } from 'src/users/dtos/users.dto';

export class LoginDto {
  @IsString({
    message: 'El correo electrónico debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  readonly email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacío' })
  @MinLength(2, { message: 'La contraseña debe tener mínimo 2 caracteres' })
  @MaxLength(20, { message: 'La contraseña debe tener máximo 20 caracteres' })
  @ApiProperty({
    description: 'La contraseña',
    minLength: 2,
    maxLength: 20,
    example: 'Password1234',
  })
  readonly password: string;
}

export class LoginSuccess {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de éxito',
    example: 'Inicio de sesión exitoso',
  })
  message: string;

  data: CreateUserResponse;
}

export class LoginError400 {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error',
    example: 'Datos erróneos',
  })
  message: string[];
}

export class LoginError409 {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error',
    example: 'Contraseña errónea',
  })
  message: string[];
}

export class LoginError500 {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensajes de error',
    example: ['Error interno del servidor'],
  })
  message: string[];
}
