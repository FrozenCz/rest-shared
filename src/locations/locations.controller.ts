import {Controller, Get} from "@nestjs/common";
import {LocationsService} from "./locations.service";
import {Location} from "./location.entity";


@Controller()
export class LocationsController {
    constructor(private locationsService: LocationsService) {
    }


    @Get()
    getLocations(): Promise<Location[]> {
        return this.locationsService.getLocations();
    }

}
