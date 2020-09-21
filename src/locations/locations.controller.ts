import {Controller, Get, Post} from "@nestjs/common";
import {LocationsService} from "./locations.service";
import {Location} from "./location.entity";
import {CreateLocationDto} from "./dto/create-location.dto";


@Controller('/locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) {
    }


    @Get()
    getLocations(): Promise<Location[]> {
        return this.locationsService.getLocations();
    }

    @Post()
    createLocation(createLocationDto: CreateLocationDto): Promise<void> {
        return this.locationsService.createLocation(createLocationDto);
    }

}
