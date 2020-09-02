import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './auth.service';
import {User} from './user.entity';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";

@Controller('auth')
export class AuthController {
    constructor(private usersService: AuthService) {
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
    createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }


}


