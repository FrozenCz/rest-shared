import {Module} from "@nestjs/common";
import {LocationsController} from "./locations.controller";
import {LocationsService} from "./locations.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocationsRepository} from "./repositories/locations.repository";
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([LocationsRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})

    ],
    controllers: [LocationsController],
    providers: [LocationsService]
})
export class LocationsModule {

}
