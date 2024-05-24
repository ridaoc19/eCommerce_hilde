import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginReturn } from '../dtos/auth.dto';
import { CreateUserResponse } from 'src/users/dtos/users.dto';

export class LoginSwagger {
  static apiPropertySuccess_statusCode() {
    return ApiProperty({
      description: 'Código de estado HTTP',
      example: HttpStatus.OK,
    });
  }

  static apiPropertySuccess_message() {
    return ApiProperty({
      description: 'Mensaje de éxito',
      example: 'Inicio de sesión exitoso',
    });
  }

  static apiPropertySuccess_data() {
    return ApiProperty({ type: CreateUserResponse });
  }

  static apiPropertyEmail() {
    return ApiProperty({
      description: 'El correo electrónico del usuario',
      example: 'juan.perez@example.com',
    });
  }

  static apiPropertyPassword() {
    return ApiProperty({
      description: 'La contraseña',
      minLength: 2,
      maxLength: 20,
      example: 'Password1234',
    });
  }

  static apiOperation() {
    return ApiOperation({ summary: 'Inicio de sesión con email y password' });
  }

  static apiResponse() {
    return applyDecorators(
      ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicio de sesión exitoso',
        type: LoginReturn,
      }),
      // ApiResponse({
      //   status: HttpStatus.BAD_REQUEST,
      //   description: 'Datos inválidos',
      //   type: LoginError400,
      // }),
      // ApiResponse({
      //   status: HttpStatus.CONFLICT,
      //   description: 'Contraseña errónea',
      //   type: LoginError409,
      // }),
      // ApiResponse({
      //   status: HttpStatus.INTERNAL_SERVER_ERROR,
      //   description: 'Error interno del servidor',
      //   type: LoginError500,
      // }),
    );
  }
}

// ! ////////////////////////////////////////////////////////////////7
class BankAccount {
  // Propiedad privada que almacena el balance de la cuenta
  private balance: number;

  // Propiedad pública que almacena el nombre del titular de la cuenta
  public ownerName: string;

  // Propiedad estática que cuenta el número de cuentas creadas
  private static accountCounter: number = 0;

  // Constructor que inicializa el nombre del titular y el balance inicial
  constructor(ownerName: string, initialBalance: number = 0) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
    // Incrementa el contador de cuentas cada vez que se crea una nueva cuenta
    BankAccount.accountCounter++;
  }

  // Método público para depositar dinero en la cuenta
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Depositado: $${amount}. Nuevo balance: $${this.balance}`);
    } else {
      console.log('El monto a depositar debe ser positivo');
    }
  }

  // Método público para retirar dinero de la cuenta
  public withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Retirado: $${amount}. Nuevo balance: $${this.balance}`);
    } else {
      console.log('Monto inválido o fondos insuficientes');
    }
  }

  // Método público para consultar el balance actual
  public getBalance(): number {
    return this.balance;
  }

  // Método estático para obtener el número de cuentas creadas
  public static getAccountCount(): number {
    return BankAccount.accountCounter;
  }
}

// Crear nuevas cuentas
const account1 = new BankAccount('Alice', 100);
const account2 = new BankAccount('Bob');

// Realizar operaciones con las cuentas
account1.deposit(50); // Depositado: $50. Nuevo balance: $150
account1.withdraw(30); // Retirado: $30. Nuevo balance: $120
console.log(account1.getBalance()); // 120

account2.deposit(200); // Depositado: $200. Nuevo balance: $200
account2.withdraw(300); // Monto inválido o fondos insuficientes
console.log(account2.getBalance()); // 200

// Obtener el número total de cuentas creadas
console.log(BankAccount.getAccountCount()); // 2
