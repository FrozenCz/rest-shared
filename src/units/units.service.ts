import {ForbiddenException, Injectable, NotFoundException, Query, ValidationPipe} from "@nestjs/common";
import {CreateUnitDto} from "./dto/create-unit.dto";
import {Unit} from "./unit.entity";
import {UnitsRepository} from "./repositories/units.repository";
import {GetUnitsFilterDto} from "./dto/get-units-filter.dto";
import {User} from '../users/user.entity';
import {UsersService} from "../users/users.service";

@Injectable()
export class UnitsService {

    constructor(private unitsRepository: UnitsRepository, private usersService: UsersService) {
    }

    async getUnits(getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]> {
        return this.unitsRepository.getUnits(getUnitsFilterDto);
    }

    // async updateUnit(updateUnitDto: UpdateUnitDto): Promise<Unit> {
    //
    // }

    async getUnitById(id: number) {
        const found = await this.unitsRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Unit with ID "${id}" not found!`);
        }

        return found;
    }

    /** vytvorit jednotku, pokud je zaslan i @parent tak se kontroluje zda existuje
     * @param createUnitDto
     * @return unit
     */
    async createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit> {
        if (createUnitDto.parent) {
            const found = await this.unitsRepository.findOne({id: createUnitDto.parent});

            if (!found) {
                throw new NotFoundException(`Parent with ID "${createUnitDto.parent}" not found! `);
            }
        }

        const unit = this.unitsRepository.create({name: createUnitDto.name, parent:createUnitDto.parent, users: []});

        if (unit.parent === undefined) {
        unit.users.push(user);
        }

        await unit.save();
        return unit;
    }

    async deleteUnit(id: number, user: User): Promise<void> {
            const isInTree = this.isManagerInTree(id, user);
            console.log(isInTree);

        return
    }

    /**
     * funkce kontroluje zda uzivatel ma prava k sekci, resp zda je ve stromove strukture v teto ci v nadrazene jednotce
     * @param unitId
     * @param user
     * @return Promise<boolean>
     */
    async isManagerInTree(unitId: number, user: User): Promise<boolean> {
        const units = await this.unitsRepository.getUnits();
        console.log(units);

        if (units.length === 0) {
            return true;
        }

        const currentUnit = units.find(unit => unit.id === unitId);
        const found = await this.recursiveSearch(units, currentUnit, user);

        return found;
    }

    private recursiveSearch(units: Unit[], currentUnit: Unit, user: User): boolean {
        console.log(currentUnit);
        const found = currentUnit.users.find(unitUser => unitUser === user);
        /**
         * nalezen
         */
        if (found) return true;
        /**
         * jsem na nejvyssi urovni a stale uzivatel nenalezen, tak vracim rovnou false
         */
        if (currentUnit.parent === null) return false;
        /**
         * nejsem na nejvyssi urovni, ale uzivatel stale nenalezen, tak se zavolej znovu
         */
        const parentUnit = units.find(unit => unit.id === currentUnit.parent);
        return this.recursiveSearch(units, parentUnit, user);
    }

    addManager(idUnit: number, idUser: number, user: User): Promise<void> {
        const isInTree = this.isManagerInTree(idUnit, user);

        if(!isInTree) {
            throw new ForbiddenException('You are not able to add manager for this unit');
        }

        //TODO: nemel by uzivatel dostat i prava?
        const unit = this.getUnitById(idUnit);
        const userToAdd = this.usersService.getUserById(idUser);

        return ;
    }


    removeManager(idUnit: number, idUser: number, user: User) {
        return Promise.resolve(undefined);
    }
}
