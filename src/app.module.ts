import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {RightsModule} from "./rights/rights.module";
import {APP_GUARD} from "@nestjs/core";
import {RightsGuard} from "./guards/rights.guard";
import {UsersModule} from "./users/users.module";
import {GetUserMiddleware} from "./middleware/get-user.middleware";
import {UsersController} from "./users/controllers/users.controller";
import {RightsController} from "./rights/rights.controller";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, RightsModule, UsersModule],
    controllers: [AppController],
    providers: [
        AppService,
        {provide: APP_GUARD, useClass: RightsGuard}
    ],
})
export class AppModule implements NestModule{

    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(GetUserMiddleware)
            .forRoutes(
                UsersController,
                RightsController
            )
    }

}
