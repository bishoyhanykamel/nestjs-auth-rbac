import { Body, Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(@Query('email', new DefaultValuePipe('')) email: string) {
    if (email.length == 0)
      return this.usersService.getAll();

    return this.usersService.getUserByEmail(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }


}
