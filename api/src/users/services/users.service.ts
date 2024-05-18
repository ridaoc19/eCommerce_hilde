import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/users.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Users) private userRepo: Repository<Users>,
  ) {}

  findAll() {
    return this.userRepo.find();
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
    const newUser = this.userRepo.create(
      Object.assign(data, {
        password: '82ac5e4c-374f-4ce7-b8dd-47699e7c5fdb',
      }),
    );
    return this.userRepo.save(newUser);
  }

  // async update(user_id: string, changes: UpdateUserDto) {
  //   const user = await this.findOne(user_id);
  //   this.userRepo.merge(user, changes);
  //   return this.userRepo.save(user);
  // }

  remove(user_id: number) {
    return this.userRepo.delete(user_id);
  }
}
