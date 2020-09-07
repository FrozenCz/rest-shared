import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query, Req, SetMetadata,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CreateUserDto} from '../dto/create-user.dto';
import {AuthService} from '../auth.service';
import {User} from '../../users/user.entity';
import {GetUsersFilterDto} from "../dto/get-users-filter.dto";
import {AuthCredentialsDto} from "../dto/auth-credentials.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../users/utils/get-user.decorator";
import {RightsGuard} from "../../guards/rights.guard";
import {Rights} from "../../guards/rights.decorator";

@Controller()
export class AuthController {
    constructor(private usersService: AuthService) {
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


