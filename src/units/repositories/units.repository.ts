import {EntityRepository, Repository, TreeRepository} from "typeorm";
import {Unit} from "../unit.entity";
import {GetUnitsFilterDto} from "../dto/get-units-filter.dto";
import {NotFoundException} from "@nestjs/common";
import {async} from "rxjs/internal/scheduler/async";


@EntityRepository(Unit)
export class UnitsRepository extends Repository<Unit> {

    async getUnitByIdWithUsers(idUnit: number): Promise<Unit> {
        const query = await this.createQueryBuilder('unit');
        query.leftJoinAndSelect('unit.users', 'users').where('unit.id = :idUnit', {idUnit});
        const found = query.getOne();

        if (!found) {
            throw new NotFoundException(`Unit with users that have id "${idUnit}" not found! `);
        }

        return found;
    }

    async getUnits(getUnitsFilterDto?: GetUnitsFilterDto, withUsers?: boolean): Promise<Unit[]> {
        let parent;
        const nestedUnits = [];

        if (getUnitsFilterDto) {
            parent = getUnitsFilterDto.parent;
        }

        const query = await this.createQueryBuilder('unit');

        if (withUsers) {
            query.leftJoinAndSelect('unit.users', 'users')
        }

        if (parent) {
            query.where('parent.id = :parent', {parent: parent.id});
        }

        const units = await query.getMany();
        if (withUsers) {
            if (units.some(u => u.users === undefined)) {
                units.find(u => u.users === undefined).users = [];
            }
        }
        nestedUnits.push(units);


        console.log(nestedUnits);

        return nestedUnits;
    }

}
