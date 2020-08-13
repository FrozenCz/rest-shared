import {Controller, Get, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {User} from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get()
  getUsers(): string {
    return 'tady je máš';
  }


  @Post()
  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }



}


