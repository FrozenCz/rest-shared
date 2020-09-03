import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './repositories/user.repository';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtModuleOptions} from "../config/jwt.config";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register(jwtModuleOptions),
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
