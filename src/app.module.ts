import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeorm.config';
import {AuthService} from './auth/auth.service';
import {UserRepository} from './auth/repositories/user.repository';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
