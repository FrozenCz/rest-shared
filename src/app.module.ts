import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {UsersService} from './users/users.service';
import {UserRepository} from './users/repositories/user.repository';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([UserRepository]), UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
