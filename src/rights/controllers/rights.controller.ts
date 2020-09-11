import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {RightsService} from "../rights.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateRightsDto} from "../dto/create-rights.dto";
import {Rights} from "../rights.entity";
import {RightsAllowed} from "../../guards/rights-allowed.decorator";
import {RightsGuard} from "../../guards/rights.guard";
import {RightsTag} from "../utils/rights.list";

@Controller('rights')
export class RightsController {
    constructor(private rightsService: RightsService) {

    }

    @Get()
    @UseGuards(AuthGuard(), RightsGuard)
    getRights(): Promise<Rights[]> {
        return this.rightsService.getRights()
    }


    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.createRights)
    createRights(@Body(ValidationPipe) createRightsDto: CreateRightsDto): Promise<Rights> {
        return this.rightsService.createRights(createRightsDto);
    }

}


