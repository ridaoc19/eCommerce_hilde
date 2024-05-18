import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener mínimo 2 caracteres' })
  @MaxLength(20, { message: 'El nombre debe tener máximo 20 caracteres' })
  @ApiProperty({
    description: 'El nombre del usuario',
    minLength: 2,
    maxLength: 20,
    example: 'Juan',
  })
  readonly name: string;

  @IsString({ message: 'El apellido debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @MinLength(2, { message: 'El apellido debe tener mínimo 2 caracteres' })
  @MaxLength(30, { message: 'El apellido debe tener máximo 30 caracteres' })
  @ApiProperty({
    description: 'El apellido del usuario',
    minLength: 2,
    maxLength: 30,
    example: 'Pérez Martinez',
  })
  readonly lastName: string;

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

  @IsPhoneNumber(null, { message: 'El número de teléfono no es válido' })
  @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío' })
  @ApiProperty({
    description: 'El número de teléfono del usuario',
    example: '123456789',
  })
  readonly phone: number;
}

export class CreateUserResponse {
  @ApiProperty({
    description: 'ID único del usuario',
    example: '5f8f8c44b54764421b7156dd',
  })
  user_id: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez Martinez',
  })
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '123456789',
  })
  phone: number;

  @ApiProperty({
    description: 'Indicador de si el usuario ha verificado su cuenta',
    example: false,
  })
  verified: boolean;

  @ApiProperty({
    description:
      'Indicador de si el correo electrónico del usuario ha sido verificado',
    example: true,
  })
  verifiedEmail: boolean;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    example: 'visitant',
    enum: ['super', 'admin', 'edit', 'visitant'],
  })
  roles: 'super' | 'admin' | 'edit' | 'visitant';

  @ApiProperty({
    description: 'Direcciones asociadas al usuario',
    example: 'Calle Falsa 123, Springfield',
  })
  addresses: string;
}
