import {ConflictException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUnitDto} from "./dto/create-unit.dto";
import {Unit} from "./unit.entity";
import {UnitsRepository} from "./repositories/units.repository";
import {GetUnitsFilterDto} from "./dto/get-units-filter.dto";
import {User} from '../users/user.entity';
import {UsersService} from "../users/users.service";

@Injectable()
export class UnitsService {

    constructor(
        private unitsRepository: UnitsRepository,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
    ) {
    }

    async listUnits(getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]> {
        return await this.unitsRepository.getUnits(getUnitsFilterDto);
    }

    async getUnitById(id: number, withUsers?: boolean): Promise<Unit> {
        let found;

        if (!withUsers) {
            found = await this.unitsRepository.findOne({id: id});
        } else {
            found = await this.unitsRepository.getUnitByIdWithUsers(id);
            if (found && found.users === undefined) {
                found.users = [];
            }
        }

        if (!found) {
            throw new NotFoundException(`Unit with ID "${id}" not found!`);
        }

        return found;
    }

    /**
     * fce pro hledani jednotky ktera je na nejvyssi urovni (ma parent null a je soucasti stromu)
     * @param id
     * @return unit
     */
    async getMasterUnit(id: number): Promise<Unit> {

        const unit = await this.getUnitById(id);
        const roots = await this.unitsRepository.findAncestors(unit);

        if (roots.length === 0) return unit;

        return roots.shift();
    }

    /**
     * vytvorit jednotku, pokud je zaslan i @parent tak se kontroluje zda existuje
     * @param createUnitDto
     * @param user
     * @return unit
     */
    async createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit> {
        let parent;
        if (createUnitDto.parent) {
            parent = await this.unitsRepository.findOne({id: createUnitDto.parent});

            if (!parent) {
                throw new NotFoundException(`Parent with ID "${createUnitDto.parent}" not found! `);
            }
        }

        const nameExists = await this.unitsRepository.findOne({name: createUnitDto.name});

        if (nameExists) {
            throw new ConflictException(`Unit with "${createUnitDto.name}" already exists!`);
        }


        const unit = new Unit();
        unit.name = createUnitDto.name;
        unit.parent = parent;
        unit.users = [];

        if (unit.parent === undefined) {
            unit.users.push(user);
        }

        await unit.save();

        const validInformation = ['username'];
        unit.users.map((user) => {
            Object.keys(user).forEach(key => {
                if (!validInformation.includes(key))
                    delete user[key];
            })
        })
        return unit;
    }

    /**
     * mazani jednotky
     * @param id
     * @param user
     */
    async deleteUnit(id: number, user: User): Promise<void> {
        //TODO: jednotka by nemela jit smazat pokud obsahuje nejake uzivatele, resp majetek
        const isInTree = this.isManagerInTree(id, user);

        if (!isInTree) {
            throw new ForbiddenException('You are not able to do that!');
        }

        const unit = await this.getUnitById(id);

        const children = await this.unitsRepository.findDescendants(unit);

        /**
         * prvne musim odstranit zavislosti
         */
        const query = await this.unitsRepository.createDescendantsQueryBuilder('unit', 'unitClosure', unit);

        await query.delete()
            .from('unit_closure')
            .where('id_ancestor IN (:...ids)', {ids: children.map(ch => ch.id)})
            .execute()

        await this.unitsRepository.remove(children.reverse());

        return;
    }

    /**
     * funkce kontroluje zda uzivatel ma prava k sekci, resp zda je ve stromove strukture v teto ci v nadrazene jednotce
     * @param unitId
     * @param user
     * @return Promise<boolean>
     */
    async isManagerInTree(unitId: number, user: User): Promise<boolean> {
        const units = await this.unitsRepository.getUnits();

        if (units.length === 0 || user.unit === null) {
            return true;
        }

        const currentUnit = units.find(unit => unit.id === unitId);
        const found = await this.recursiveSearch(units, currentUnit, user);

        return found;
    }

    /**
     * prirazeni manazera jednotce
     * @param idUnit
     * @param idUser
     * @param user
     */
    async addManager(idUnit: number, idUser: number, user: User): Promise<void> {
        const unit = await this.getUnitById(idUnit, true);
        const isInTree = await this.isManagerInTree(idUnit, user);
        const userToAdd = await this.usersService.getUserById(idUser);

        if (!isInTree) {
            throw new ForbiddenException('You are not able to add manager for this unit');
        }

        /**
         * pokud je uzivatel jiz prirazen
         */
        if (unit.users.find(u => u.id === idUser)) {
            throw new ConflictException(`User ID "${idUser}" already exists on unit ID "${idUnit}" `);
        }

        //TODO: nemel by uzivatel dostat i nejaka zakladni prava?

        unit.users.push(userToAdd);
        unit.save();

        return;
    }

    /**
     * odebirani uzivatelu z jednotky
     * @param idUnit
     * @param idUser
     * @param user
     */
    async removeManager(idUnit: number, idUser: number, user: User) {
        const unit = await this.getUnitById(idUnit, true)
        const isInTree = await this.isManagerInTree(idUnit, user)

        if (!isInTree) {
            throw new ForbiddenException('You are not able to this action!');
        }

        unit.users = unit.users.filter(u => u.id !== idUser)
        unit.save()

        return
    }

    private async recursiveSearch(units: Unit[], currentUnit: Unit, user: User): Promise<boolean> {
        if (user.id === 1) return true; // pokud se jedná o administrátora
        const found = await currentUnit.users.find(unitUser => unitUser.id === user.id);
        /**
         * nalezen
         */
        if (found) return true;
        /**
         * jsem na nejvyssi urovni a stale uzivatel nenalezen, tak vracim false
         */
        if (currentUnit.parent === null) {
            return false;
        }
        /**
         * nejsem na nejvyssi urovni, ale uzivatel stale nenalezen, tak se zavolej znovu
         */
        const parentUnit = units.find(unit => unit.id === currentUnit.parent.id);

        return this.recursiveSearch(units, parentUnit, user);
    }
}
