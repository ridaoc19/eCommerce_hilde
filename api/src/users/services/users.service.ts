import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/users.dto';
import { Users } from '../entities/users.entity';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AddCronJob, EmailService } from 'src/email/services/email.service';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private emailServices: EmailService,
    @InjectRepository(Users) private userRepo: Repository<Users>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findOne(user_id: string) {
    const user = await this.userRepo.findOne({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`User #${user_id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const temporaryPassword: string = uuidv4().split('-', 1)[0];
      const newUser = this.userRepo.create(data);

      const hashPassword = await bcrypt.hash(temporaryPassword, 10);
      newUser.password = hashPassword;
      const userCreate = await this.userRepo.save(newUser);

      this.emailServices.addCronJob({
        type: AddCronJob.Registre,
        passwordTemporality: temporaryPassword,
        email: userCreate.email,
      });

      return userCreate;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  remove(user_id: number) {
    return this.userRepo.delete(user_id);
  }
}
