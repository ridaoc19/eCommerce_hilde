import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponse } from 'src/users/dtos/users.dto';
import { structureDataUser } from 'src/users/dtos/users.swagger';
import { LoginResponse, LoginUnauthorized } from '../dtos/auth.dto';

export enum LoginType {
  Success = 'success',
  Unauthorized = 'unauthorized',
}

export type LoginTypeMap = {
  [LoginType.Success]: {
    type: LoginType.Success;
    element: 'statusCode' | 'message' | 'data';
  };
  [LoginType.Unauthorized]: {
    type: LoginType.Unauthorized;
    element: 'statusCode' | 'error' | 'message';
  };
};

export class LoginSwagger {
  static LoginDto(type: 'email' | 'password') {
    switch (type) {
      case 'email':
        return ApiProperty({
          description: 'El correo electrónico del usuario',
          example: 'juan.perez@example.com',
        });

      case 'password':
        return ApiProperty({
          description: 'La contraseña',
          minLength: 2,
          maxLength: 20,
          example: 'Password1234',
        });
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  static login() {
    return applyDecorators(
      ApiOperation({ summary: 'Inicio de sesión con email y password' }),
      ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicio de sesión exitoso',
        type: LoginResponse,
      }),
      ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Errores en autenticación con Token',
        type: LoginUnauthorized,
      }),
    );
  }

  static Response<T extends LoginType>(
    type: T,
    element: LoginTypeMap[T]['element'],
  ): PropertyDecorator {
    switch (type) {
      case LoginType.Success:
        switch (element) {
          case 'statusCode':
            return ApiProperty({
              description: 'Código de estado HTTP',
              example: HttpStatus.OK,
            });

          case 'message':
            return ApiProperty({
              description: 'Mensaje de éxito',
              example: `${structureDataUser({}).name} debes cambiar la contraseña por una de tú preferencia || ${structureDataUser({}).name} verifica el buzón de correo, y valida el correo electrónico, si no desea cambiarlo, en 10 minutos seguirá registrado con el correo ${structureDataUser({}).email} || ¡Inicio de sesión exitoso! \n\n ${structureDataUser({}).name},Te damos la bienvenida de vuelta a nuestro sitio web.`,
            });

          case 'data':
            return ApiProperty({ type: CreateUserResponse });

          default:
            throw new Error(`Unsupported type: ${type}`);
        }
      case LoginType.Unauthorized:
        switch (element) {
          case 'statusCode':
            return ApiProperty({
              description: 'Código de estado',
              example: HttpStatus.UNAUTHORIZED,
            });
          case 'error':
            return ApiProperty({
              description: 'Mensaje de error',
              example: 'Unauthorized',
            });
          case 'message':
            return ApiProperty({
              description: 'Mensajes del error',
              example: [
                'Correo electrónico o contraseña incorrectos',
                'Fallo inicio de sesión',
              ],
            });
          default:
            throw new Error(
              `Unsupported element for type 'Unauthorized': ${element}`,
            );
        }
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
}
