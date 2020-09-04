import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RightsController} from './rights.controller';
import {RightsRepository} from "./repositories/rights.repository";
import {RightsService} from "./rights.service";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      TypeOrmModule.forFeature([RightsRepository]),
      PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [RightsController],
  providers: [RightsService],
    exports: [RightsService]
})
export class RightsModule {}
