import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RightsController} from './rights.controller';
import {RightsRepository} from "./repositories/rights.repository";
import {RightsService} from "./rights.service";

@Module({
  imports: [TypeOrmModule.forFeature([RightsRepository])],
  controllers: [RightsController],
  providers: [RightsService]
})
export class RightsModule {}
