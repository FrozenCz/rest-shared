import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {RightsModule} from "./rights/rights.module";
import {UsersModule} from "./users/users.module";


@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, RightsModule, UsersModule],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule {}
