import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {UserRepository} from './users/repositories/user.repository';
import {RightsModule} from "./rights/rights.module";
import {APP_GUARD} from "@nestjs/core";
import {RightsGuard} from "./guards/rights.guard";
import {UsersModule} from "./users/users.module";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([UserRepository]), AuthModule, RightsModule, UsersModule],
    controllers: [AppController],
    providers: [
        AppService,
        {provide: APP_GUARD, useClass: RightsGuard}
    ],
})
export class AppModule {
}
