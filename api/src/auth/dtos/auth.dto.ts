import { HttpStatus } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserResponse } from 'src/users/dtos/users.dto';
import { LoginSwagger, LoginType } from '../openApi/login.swagger';
import { TokenSwagger, TokenType } from '../openApi/token.swagger';

// ! LOGIN
export class LoginDto {
  @IsString({
    message: 'El correo electrónico debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @LoginSwagger.LoginDto('email')
  readonly email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacío' })
  @MinLength(2, { message: 'La contraseña debe tener mínimo 2 caracteres' })
  @MaxLength(20, { message: 'La contraseña debe tener máximo 20 caracteres' })
  @LoginSwagger.LoginDto('password')
  readonly password: string;
}

export class LoginResponse {
  @LoginSwagger.Response(LoginType.Success, 'statusCode')
  statusCode: HttpStatus.OK;

  @LoginSwagger.Response(LoginType.Success, 'message')
  message: string;

  @LoginSwagger.Response(LoginType.Success, 'data')
  data: CreateUserResponse;
}

export class LoginUnauthorized {
  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'statusCode',
  })
  statusCode: HttpStatus.UNAUTHORIZED;

  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'error',
  })
  error: string;

  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'message',
  })
  message: string[];
}

// ! TOKEN
export class TokenResponse extends OmitType(LoginResponse, [
  'message',
] as const) {
  @TokenSwagger.TokenResponse({ type: TokenType.Success, element: 'message' })
  message: string;
}

export class TokenUnauthorized {
  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'statusCode',
  })
  statusCode: HttpStatus.UNAUTHORIZED;

  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'error',
  })
  error: string;

  @TokenSwagger.TokenResponse({
    type: TokenType.Unauthorized,
    element: 'message',
  })
  message: string[];
}
