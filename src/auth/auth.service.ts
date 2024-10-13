import { BadRequestException, HttpCode, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HashingProvider } from './providers/hashing.provider';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
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
    const createdUser = await this.userService.createUser(createUserDto);
    const accessToken = await this.generateAccessToken(createdUser.id, createdUser.email);
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  async loginUser(loginUserDto: LoginUserDto) {
    let user: User[] | User = await this.userService.getUserByEmail(loginUserDto.email);
    if (user.length != 1)
      throw new BadRequestException('Invalid email input.');
    user = user[0];
    const isAuthenticated = await this.hashingProvider.comparePasswords(loginUserDto.password, user.password);

    if (!isAuthenticated)
      throw new UnauthorizedException('Incorrect email or password!');

    const accessToken = await this.generateAccessToken(user.id, user.email);

    return { accessToken };
  }

  private async generateAccessToken(id: number, email: string): Promise<string> {
    return await this.jwtService.signAsync({
      sub: id,
      email: email
    },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        expiresIn: this.jwtConfiguration.expireAt,
        issuer: this.jwtConfiguration.issuer
      })
  }
}
