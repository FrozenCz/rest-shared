import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
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

    async listLocations(): Promise<Location[]> {
        return this.locationsRepository.listLocations();
    }

    /**
     * vytvori lokaci
     * @param createLocationDto
     * @param user
     */
    async createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location> {
        let parentLocation;
        let userScopeMasterUnit;
        const {name, parent = null, masterUnit = null} = createLocationDto || {};

        if (parent) {
            parentLocation = await this.getLocationById(parent);
            if (!parentLocation) {
                throw new NotFoundException(`Location with ID "${parent}" not found! `);
            }
        }

        if (user?.unit?.id) {
            userScopeMasterUnit = await this.unitsService.getMasterUnit(user.unit.id);
            const unitScopeMasterUnit = await this.unitsService.getMasterUnit(parentLocation.masterUnit);

            if (userScopeMasterUnit !== unitScopeMasterUnit) {
                throw new ForbiddenException(`You are not able to set unit under "${unitScopeMasterUnit}" master unit `);
            }

        } else {
            userScopeMasterUnit = await this.unitsService.getMasterUnit(masterUnit);
        }

        const location = new Location();
        location.name = name;
        location.parent = parentLocation;
        location.masterUnit = userScopeMasterUnit;
        return await location.save();
    }

    async deleteLocation(id: number): Promise<void> {
        const location = await this.getLocationById(id);
        // todo: kontrola zda lokace nejsou obsazene v nejakych majetkach? i ty pod?
        return this.locationsRepository.deleteLocation(location);
    }
}
