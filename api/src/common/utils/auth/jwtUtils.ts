import * as jwt from 'jsonwebtoken';
import { Users } from 'src/users/entities/users.entity';

export interface PayloadToken {
  user_id: string;
  email: string;
}

const secretKey = process.env.SECRET_KEY_JWT!;

export function generateTokenJWT(
  payload: Users,
): Users & { access_token: string } {
  const assignToken: PayloadToken = {
    user_id: payload.user_id,
    email: payload.email,
  };
  const access_token = jwt.sign(assignToken, secretKey, { expiresIn: '1s' });
  return Object.assign(payload, { access_token });
}

export function verifyTokenJWT(token: string): any {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return { token: true };
  }
}

const secretKeyEmail = process.env.SECRET_KEY_JWT_EMAIL!;

export function generateTokenEmail(payload: {
  user_id: string;
  email: string;
}): string {
  // Generar el token con el payload y la clave secreta
  return jwt.sign(payload, secretKeyEmail, { expiresIn: '10m' });
}

export function verifyTokenEmail(token: string): any {
  // Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, secretKeyEmail);
    return decoded;
  } catch (error) {
    return { token: true };
    // throw new Error('Token inválido');
  }
}
