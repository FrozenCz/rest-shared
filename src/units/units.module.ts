import {Module} from "@nestjs/common";
import {UnitsController} from "./units.controller";
import {UsersModule} from "../users/users.module";
import {UnitsService} from "./units.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UnitsRepository} from "./repositories/units.repository";
import {PassportModule} from "@nestjs/passport";


@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([UnitsRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    controllers: [UnitsController],
    providers: [UnitsService]
})
export class UnitsModule {
}
