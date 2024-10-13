import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HashingProvider } from './providers/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider
  ) { }

  async registerUser(createUserDto: CreateUserDto) {
    // 1. check if user already exists
    const user = await this.userService.getUserByEmail(createUserDto.email);
    if (user.length >= 1)
      throw new BadRequestException('This email is already registered.');
    // 2. hash password
    const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password);
    // 3. store password
    createUserDto = {
      ...createUserDto,
      password: hashedPassword
    }
    // 4. create user
    return this.userService.createUser(createUserDto);
    // 5. generate JWT
  }

  async loginUser(loginUserDto: LoginUserDto) {
    // 1. check if user already exists
    let user : User[] | User = await this.userService.getUserByEmail(loginUserDto.email);
    if (user.length != 1)
      throw new BadRequestException('Invalid email input.');
    // 2. load user
    user = user[0];
    // 3. compare hashed passwords
    return await this.hashingProvider.comparePasswords(loginUserDto.password, user.password);
    // 4. generate JWT
  }
}
