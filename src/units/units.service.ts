import {Injectable, NotFoundException, Query, ValidationPipe} from "@nestjs/common";
import {CreateUnitDto} from "./dto/create-unit.dto";
import {Unit} from "./unit.entity";
import {UnitsRepository} from "./repositories/units.repository";
import {GetUnitsFilterDto} from "./dto/get-units-filter.dto";
import {User} from '../users/user.entity';

@Injectable()
export class UnitsService {

    constructor(private unitsRepository: UnitsRepository) {
    }

    async getUnits(getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]> {
        return this.unitsRepository.getUnits(getUnitsFilterDto);
    }

    /** vytvorit jednotku, pokud je zaslan i @parent tak se kontroluje zda existuje
     * @param createUnitDto
     * @return unit
     */
    async createUnit(createUnitDto: CreateUnitDto): Promise<Unit> {
        if (createUnitDto.parent) {
            const found = await this.unitsRepository.findOne({id: createUnitDto.parent});

            if (!found) {
                throw new NotFoundException(`Parent with ID "${createUnitDto.parent}" not found! `);
            }
        }

        const unit = this.unitsRepository.create({name: createUnitDto.name, parent:createUnitDto.parent});

        await unit.save();
        return unit;
    }

    async deleteUnit(id: number, user: User): Promise<void> {
            console.log(user, id);
        return
    }

    async isManagerInTree(unitId: number, user: User): Promise<boolean> {
        return
    }
}
