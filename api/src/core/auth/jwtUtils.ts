import jwt from 'jsonwebtoken';

// Clave secreta para firmar los tokens (puedes cambiarla por tu propia clave)
const secretKey = process.env.SECRET_KEY_JWT!;

export function generateToken(payload: string): string {
  // Generar el token con el payload y la clave secreta
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  // Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
