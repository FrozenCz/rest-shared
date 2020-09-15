import {EntityRepository, Repository} from "typeorm";
import {Unit} from "../unit.entity";
import {GetUnitsFilterDto} from "../dto/get-units-filter.dto";


@EntityRepository(Unit)
export class UnitsRepository extends Repository<Unit> {

    async getUnits(getUnitsFilterDto?: GetUnitsFilterDto): Promise<Unit[]> {
        let parent;

        if (getUnitsFilterDto) {
            parent = getUnitsFilterDto.parent;
        }

        const query = await this.createQueryBuilder('unit');
        query.leftJoinAndSelect('unit.users', 'users')

        if (parent) {
            query.where('parent = :parent', {parent});
        }

        const units = await query.getMany();

        return units;
    }

}
