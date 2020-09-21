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

    /**
     * vytvori lokaci
     * @param createLocationDto
     */
   async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
        let parent;
        const { name } = createLocationDto;

        if( createLocationDto.parent ) {
            parent = await this.getLocationById(createLocationDto.parent);
        }

        const location = new Location();
        location.name = name;
        location.parent = parent;
        return await location.save();
    }


    async deleteLocation(id: number): Promise<void> {
       const location = await this.getLocationById(id);
       // todo: kontrola zda lokace nejsou obsazene v nejakych majetkach? i ty pod?

        const children = await this.locationsRepository.findDescendants(location);
        /**
         * prvne musim odstranit zavislosti
         */
        const query = await this.locationsRepository.createDescendantsQueryBuilder('location', 'locationClosure', location);

        await query.delete()
            .from('location_closure')
            .where('id_ancestor IN (:...ids)', {ids: children.map(ch => ch.id)})
            .execute()

        await this.locationsRepository.remove(children.reverse());

        return;
    }
}
