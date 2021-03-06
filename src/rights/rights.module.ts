import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RightsController} from './rights.controller';
import {RightsRepository} from "./repositories/rights.repository";
import {RightsService} from "./rights.service";
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "../auth/auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtModuleOptions} from "../config/jwt.config";

@Module({
  imports: [
      forwardRef(() => UsersModule),
      TypeOrmModule.forFeature([RightsRepository]),
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register(jwtModuleOptions),
  ],
  controllers: [RightsController],
  providers: [RightsService, AuthService],
    exports: [RightsService, TypeOrmModule]
})
export class RightsModule {}
