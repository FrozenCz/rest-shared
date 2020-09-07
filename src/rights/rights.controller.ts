import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {RightsService} from "./rights.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateRightsDto} from "./dto/create-rights.dto";
import {Rights} from "./rights.entity";

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
    createRights(@Body(ValidationPipe) createRightsDto: CreateRightsDto): Promise<Rights> {
        return this.rightsService.createRights(createRightsDto);
    }

}

