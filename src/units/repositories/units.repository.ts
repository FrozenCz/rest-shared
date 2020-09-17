import {EntityRepository, getManager, Repository, TreeRepository} from "typeorm";
import {Unit} from "../unit.entity";
import {GetUnitsFilterDto} from "../dto/get-units-filter.dto";
import {NotFoundException} from "@nestjs/common";
import {async} from "rxjs/internal/scheduler/async";


@EntityRepository(Unit)
export class UnitsRepository extends TreeRepository<Unit> {

    async getUnitById(id: number): Promise<Unit> {
        const found = this.findOne(id);
        if (!found) {
            throw new NotFoundException(`Unit with ID ${id} not found! `);
        }
        return found;
    }

    async getUnitByIdWithUsers(idUnit: number): Promise<Unit> {
        const query = await this.createQueryBuilder('unit');
        query.leftJoinAndSelect('unit.users', 'users').where('unit.id = :idUnit', {idUnit});
        const found = query.getOne();

        if (!found) {
            throw new NotFoundException(`Unit with users that have id "${idUnit}" not found! `);
        }

        return found;
    }

    async getUnits(getUnitsFilterDto?: GetUnitsFilterDto): Promise<Unit[]> {
        let parent;
        let units;

        if (getUnitsFilterDto) {
            parent = getUnitsFilterDto.parent;
        }

        if (parent) {
            const ancestor = await this.getUnitById(parent);
            units = await this.findDescendantsTree(ancestor)
        } else {
            units = await this.findTrees();
        }

        return units;
    }

}
