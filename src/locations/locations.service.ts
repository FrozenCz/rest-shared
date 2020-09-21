import {Injectable} from "@nestjs/common";
import {LocationsRepository} from "./repositories/locations.repository";
import {Location} from "./location.entity";


@Injectable()
export class LocationsService {

    constructor(private readonly locationsRepository: LocationsRepository) {
    }

    async getLocations(): Promise<Location[]> {
        return this.locationsRepository.findTrees();
    }

}
