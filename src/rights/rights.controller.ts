import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {RightsService} from "./rights.service";
import {Rights} from "./rights.entity";
import {AuthGuard} from "@nestjs/passport";
import {CreateRightsDto} from "./dto/create-rights.dto";

@Controller('rights')
export class RightsController {
    constructor(private rightsService: RightsService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    getRights(): Promise<Rights[]> {
        return this.rightsService.getRights()
    }

    @Post()
    createRights(@Body(ValidationPipe) createRightsDto: CreateRightsDto): Promise<void> {
        return this.rightsService.createRights(createRightsDto);
    }

}

