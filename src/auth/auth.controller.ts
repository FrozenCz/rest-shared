import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query, Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {AuthService} from './auth.service';
import {User} from './user.entity';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./utils/get-user.decorator";

@Controller()
export class AuthController {
    constructor(private usersService: AuthService) {
    }


    @UseGuards(AuthGuard())
    @Post('users')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }

    @Get('users')
    getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('users/:id')
    getUserById(@Param('id', ParseIntPipe) id:number ): Promise<User>{
        return this.usersService.getUserById(id);
    }

    @Post('auth/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken:string }> {
        return this.usersService.singIn(authCredentialsDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
    //     console.log(user);
    // }


}


