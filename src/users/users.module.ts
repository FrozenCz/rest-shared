import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {PassportModule} from "@nestjs/passport";
import {UnitsModule} from '../units/units.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        forwardRef(() => UnitsModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {
}
