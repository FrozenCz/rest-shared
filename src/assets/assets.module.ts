import {Module} from '@nestjs/common';
import {AssetsService} from './assets.service';
import {AssetsController} from './assets.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {AssetsRepository} from './repositories/assets.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([AssetsRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    controllers: [AssetsController],
    providers: [AssetsService]
})
export class AssetsModule {

}
