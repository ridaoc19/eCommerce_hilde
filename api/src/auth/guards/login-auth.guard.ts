import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user || info) {
      if (err.response.error === 'Unauthorized') {
        throw new UnauthorizedException([
          'Correo electrónico o contraseña incorrectos',
        ]);
      }
      throw new UnauthorizedException('Fallo inicio de sesión');
    }

    return user;
  }
}
