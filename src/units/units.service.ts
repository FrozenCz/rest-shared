import {ConflictException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
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
        return this.unitsRepository.getUnits(getUnitsFilterDto, true);
    }

    async getUnitById(id: number, withUsers?: boolean) {
        let found;

        if (!withUsers) {
            found = await this.unitsRepository.findOne(id);
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

    /** vytvorit jednotku, pokud je zaslan i @parent tak se kontroluje zda existuje
     * @param createUnitDto
     * @return unit
     */
    async createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit> {
        let parent;
        const nameExists = await this.unitsRepository.findOne({name: createUnitDto.name});

        if (nameExists) {
            throw new ConflictException(`Unit with "${createUnitDto.name}" already exists!`);
        }

        if (createUnitDto.parent) {
            parent = await this.unitsRepository.findOne({id: createUnitDto.parent});

            if (!parent) {
                throw new NotFoundException(`Parent with ID "${createUnitDto.parent}" not found! `);
            }
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
              if(!validInformation.includes(key))
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
        const units = await this.unitsRepository.getUnits(undefined, true);

        if (units.length === 0) {
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
        if(user.id === 1) return true; // pokud se jedná o administrátora
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
