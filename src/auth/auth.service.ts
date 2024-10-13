import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
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
    const user = await this.userService.getUserByEmail(createUserDto.email);
    if (user.length >= 1)
      throw new BadRequestException('This email is already registered.');
    const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password);
    createUserDto = {
      ...createUserDto,
      password: hashedPassword
    }
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  async loginUser(loginUserDto: LoginUserDto) {
    let user : User[] | User = await this.userService.getUserByEmail(loginUserDto.email);
    if (user.length != 1)
      throw new BadRequestException('Invalid email input.');
    user = user[0];
    return await this.hashingProvider.comparePasswords(loginUserDto.password, user.password);
  }
}
