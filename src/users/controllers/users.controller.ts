import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Rights} from "../../guards/rights.decorator";
import {GetUser} from "../utils/get-user.decorator";
import {User} from "../user.entity";
import {CreateUserDto} from "../../auth/dto/create-user.dto";
import {GetUsersFilterDto} from "../../auth/dto/get-users-filter.dto";
import {UsersService} from "../users.service";
import {RightsGuard} from "../../guards/rights.guard";

@Controller()
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Rights('createUser')
    @Post('users')
    createUser(@GetUser() user: User, @Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }


    @UseGuards(AuthGuard('jwt'), RightsGuard)
    @Rights('createUser')
    @Get('users')
    getUsers(@GetUser() user: User, @Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto
    ): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('users/:id')
    getUserById(@Param('id', ParseIntPipe) id:number ): Promise<User>{
        return this.usersService.getUserById(id);
    }
}
