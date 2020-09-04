import {Controller, Get, Post} from '@nestjs/common';
import {RightsService} from "./rights.service";
import {Rights} from "./rights.entity";

@Controller('rights')
export class RightsController {
    constructor(private rightsService: RightsService) {
    }

    @Get()
    getRights(): Promise<Rights[]> {
        return this.rightsService.getRights()
    }

}

