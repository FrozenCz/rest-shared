import {
    Body,
    Controller,
    Post,
    ValidationPipe
} from '@nestjs/common';
import {AuthService} from '../auth.service';

import {AuthCredentialsDto} from "../dto/auth-credentials.dto";


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


