import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { structureDataUser } from 'src/users/dtos/users.swagger';
import { TokenResponse, TokenUnauthorized } from '../dtos/auth.dto';

export enum TokenType {
  Success = 'success',
  Unauthorized = 'unauthorized',
}

export type TokenTypeMap = {
  [TokenType.Success]: {
    type: TokenType.Success;
    element: 'message';
  };
  [TokenType.Unauthorized]: {
    type: TokenType.Unauthorized;
    element: 'statusCode' | 'error' | 'message';
  };
};

export class TokenSwagger {
  static token() {
    return applyDecorators(
      ApiOperation({ summary: 'Inicio de sesión con Token' }),

      ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicio de sesión exitoso con Token',
        type: TokenResponse,
      }),
      ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Errores en autenticación con Token',
        type: TokenUnauthorized,
      }),
    );
  }

  static TokenResponse<T extends TokenType>({
    type,
    element,
  }: {
    type: T;
    element: TokenTypeMap[T]['element'];
  }): PropertyDecorator {
    switch (type) {
      case TokenType.Success:
        switch (element) {
          case 'message':
            return ApiProperty({
              description: 'Mensaje de éxito',
              example: `¡Bienvenido de vuelta, ${structureDataUser({}).name}! Te has conectado exitosamente utilizando un token de sesión.`,
            });
          default:
            throw new Error(
              `Unsupported element for type 'Success': ${element}`,
            );
        }
      case TokenType.Unauthorized:
        switch (element) {
          case 'statusCode':
            return ApiProperty({
              description: 'Código de estado',
              example: '401',
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
                'El token ha expirado',
                'El token no es válido',
                'Autenticación fallida',
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
