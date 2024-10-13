import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HashingProvider } from './providers/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider
  ) { }

  async registerUser(createUserDto: CreateUserDto) {
    // 1. check if user already exists
    // 2. create user
    // 3. hash password
    // 4. store password
    // 5. generate JWT
  }

  async loginUser(loginUserDto: LoginUserDto) {
    // 1. check if user already exists
    // 2. load user
    // 3. hash input password
    // 4. generate JWT
  }
}
