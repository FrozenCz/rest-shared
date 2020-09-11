import {Injectable, Query, ValidationPipe} from "@nestjs/common";
import {CreateUnitDto} from "./dto/create-unit.dto";
import {Unit} from "./unit.entity";
import {UnitsRepository} from "./repositories/units.repository";
import {GetUnitsFilterDto} from "./dto/get-units-filter.dto";

@Injectable()
export class UnitsService {

    constructor(private unitsRepository: UnitsRepository) {
    }

    async getUnits(getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]> {
        return this.unitsRepository.getUnits(getUnitsFilterDto);
    }

    async createUnit(createUnitDto: CreateUnitDto): Promise<Unit> {
        const unit = this.unitsRepository.create({name: createUnitDto.name, parent:createUnitDto.parent});
        await unit.save();
        return unit;
    }


}
