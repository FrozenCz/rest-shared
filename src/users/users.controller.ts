import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {RightsAllowed} from "../guards/rights-allowed.decorator";
import {GetUser} from "./utils/get-user.decorator";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UsersService} from "./users.service";
import {RightsGuard} from "../guards/rights.guard";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RightsTag} from "../rights/config/rights.list";
import {ApiProperty} from '@nestjs/swagger';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.createUser)
    createUser(@GetUser() user: User, @Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.getUser)
    getUsers(@GetUser() user: User, @Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto
    ): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id:number ): Promise<User>{
        return this.usersService.getUserById(id);
    }

    @Put('/:id')
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.updateUsersInformation)
    updateUser(@Param('id', ParseIntPipe) id:number, @GetUser() user:User, @Body(ValidationPipe) updateUserDto: UpdateUserDto): Promise<void> {
        return this.usersService.updateUser(id, updateUserDto, user);
    }

    // @Post('/:id/users')


}
