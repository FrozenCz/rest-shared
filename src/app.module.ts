import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {UserRepository} from './auth/repositories/user.repository';
import {RightsModule} from "./rights/rights.module";

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([UserRepository]), AuthModule, RightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
