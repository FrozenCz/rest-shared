import {Module} from '@nestjs/common';
import {UsersController} from "./controllers/users.controller";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService]
})
export class UsersModule {
}
