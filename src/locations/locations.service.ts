import {Injectable, NotFoundException} from "@nestjs/common";
import {LocationsRepository} from "./repositories/locations.repository";
import {Location} from "./location.entity";
import {CreateLocationDto} from "./dto/create-location.dto";
import {UnitsService} from '../units/units.service';
import {User} from '../users/user.entity';
import {InjectRepository} from '@nestjs/typeorm';


@Injectable()
export class LocationsService {

    constructor(
        @InjectRepository(LocationsRepository)
        private locationsRepository: LocationsRepository,
        private readonly unitsService: UnitsService) {
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
    async createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location> {
        let parentLocation;
        const {name, parent, unit} = createLocationDto || {};
        const unitFound = this.unitsService.getUnitById(unit);

        if (!unitFound) {
            throw new NotFoundException(`Unit with ID "${unit}" not found! `);
        }

        if (parent) {
            parentLocation = await this.getLocationById(createLocationDto.parent);
        }

        const location = new Location();
        location.name = name;
        location.parent = parentLocation;
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
