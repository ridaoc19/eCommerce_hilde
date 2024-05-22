import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/users.entity';

export interface PayloadToken {
  role: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  generateJWT(user: Users) {
    const payload: PayloadToken = { role: user.roles, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
