import { UserRole, Users } from '../entities/users.entity';

export const structureDataUser = ({
  user_id = 'f891628a-b347-4c04-b886-c70597825de5',
  name = 'Juan',
  lastName = 'Pérez Martinez',
  email = 'juan.perez@example.com',
  password = 'Password1234',
  phone = 123456789,
  verified = false,
  verifiedEmail = true,
  roles = UserRole.Visitant,
  addresses = 'Calle Falsa 123, Springfield',
  createAt = new Date('24-05-25T03:34:32.423Z'),
  updateAt = new Date('2024-05-25T03:34:32.423Z'),
}: Partial<Users>): Users => ({
  user_id,
  name,
  lastName,
  email,
  password,
  phone,
  verified,
  verifiedEmail,
  roles,
  addresses,
  createAt,
  updateAt,
});
