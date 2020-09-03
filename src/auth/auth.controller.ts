import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './auth.service';
import {User} from './user.entity';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Controller('auth')
export class AuthController {
    constructor(private usersService: AuthService) {
    }


    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id:number ): Promise<User>{
        return this.usersService.getUserById(id);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.usersService.singIn(authCredentialsDto);
    }


}


