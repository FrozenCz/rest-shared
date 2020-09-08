import {Module} from '@nestjs/common';
import {UsersController} from "./controllers/users.controller";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {
}
