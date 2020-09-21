import {Injectable, NotFoundException} from "@nestjs/common";
import {LocationsRepository} from "./repositories/locations.repository";
import {Location} from "./location.entity";
import {CreateLocationDto} from "./dto/create-location.dto";


@Injectable()
export class LocationsService {

    constructor(private readonly locationsRepository: LocationsRepository) {
    }

    async getLocationById(id: number): Promise<Location> {
        const found = this.locationsRepository.findOne({id});
        if (!found) {
            throw new NotFoundException(`Location with ID "${id}" not found!`);
        }
        return found;
    }

    async getLocations(): Promise<Location[]> {
        return this.locationsRepository.findTrees();
    }

    createLocation(createLocationDto: CreateLocationDto) {
        let parent;
        const { name } = createLocationDto;

        if( createLocationDto.parent ) {

        }


        const location = new Location();
        location.name = name;
        location.parent = parent;

    }
}
