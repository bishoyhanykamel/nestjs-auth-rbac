import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async getAll() {
    return this.userRepo.find();
  }

  async getUserByEmail(email: string) {
    return this.userRepo.find({
      where: {
        email: Like(`%${email}%`)
      }
    })
  }

  async createUser(createUserDto: CreateUserDto) {
    let user = this.userRepo.create(createUserDto);

    return await this.userRepo.save(user);
  }
}
