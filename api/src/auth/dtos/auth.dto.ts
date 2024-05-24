import { HttpStatus } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserResponse } from 'src/users/dtos/users.dto';
import { LoginSwagger } from '../openApi/login.swagger';

export class LoginDto {
  @IsString({
    message: 'El correo electrónico debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @LoginSwagger.apiPropertyEmail()
  readonly email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacío' })
  @MinLength(2, { message: 'La contraseña debe tener mínimo 2 caracteres' })
  @MaxLength(20, { message: 'La contraseña debe tener máximo 20 caracteres' })
  @LoginSwagger.apiPropertyPassword()
  readonly password: string;
}

export class LoginReturn {
  @LoginSwagger.apiPropertySuccess_statusCode()
  statusCode: HttpStatus.OK;

  @LoginSwagger.apiPropertySuccess_message()
  message: string;

  @LoginSwagger.apiPropertySuccess_data()
  data: CreateUserResponse;
}
