import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RightsController} from './rights.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [RightsController],
})
export class UsersModule {}
