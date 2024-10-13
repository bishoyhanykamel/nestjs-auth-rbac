import { Body, Controller, DefaultValuePipe, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  getUsers(@Query('email', new DefaultValuePipe('')) email: string) {
    if (email.length == 0)
      return this.usersService.getAll();

    return this.usersService.getUserByEmail(email);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }


}
