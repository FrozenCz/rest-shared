import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {User} from './user.entity';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get()
    getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id:number ): Promise<User>{
        return this.usersService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }


}


