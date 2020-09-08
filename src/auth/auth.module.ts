import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtModuleOptions} from "../config/jwt.config";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register(jwtModuleOptions),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule {
}
