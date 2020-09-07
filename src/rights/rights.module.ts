import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RightsController} from './rights.controller';
import {RightsRepository} from "./repositories/rights.repository";
import {RightsService} from "./rights.service";
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "../auth/auth.service";
import {UserRepository} from "../users/repositories/user.repository";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([RightsRepository]),
      PassportModule.register({defaultStrategy: 'jwt'}),
      UsersModule
  ],
  controllers: [RightsController],
  providers: [RightsService, AuthService, UserRepository],
    exports: [RightsService]
})
export class RightsModule {}
