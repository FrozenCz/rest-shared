import {
    BadRequestException,
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable, InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {User} from "./user.entity";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UnitsService} from '../units/units.service';
import {SetUserRightsDto} from './dto/set-user-rights.dto';
import {RightsService} from '../rights/rights.service';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @Inject(forwardRef(() => UnitsService))
        private unitsService: UnitsService,
        @Inject(forwardRef(() => RightsService))
        private rightsService: RightsService
    ) {
    }

    /**
     * kontroluje zda je uzivatel co zadava pozadavek ve stromove strukture (null bere vše)
     * @param userEdited
     * @param editedBy
     */
    private async inScope(userEdited: User, editedBy: User): Promise<boolean> {
        if (userEdited.unit === null && editedBy.unit === null) {
            return true;
        } else {
            return await this.unitsService.isManagerInTree(userEdited.unit.id, editedBy);
        }
    }

    /**
     * vraci pocet uzivatelu
     */
    async countUsers(): Promise<number> {
        return await this.userRepository.count();
    }

    /**
     * tvorba uzivatele
     * @param createUserDto
     * @return noveho uzivatele
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {name, surname, password, username, unitId} = createUserDto;


        const user = new User();

        user.username = username;
        user.name = name;
        user.surname = surname;
        user.password = password; // still plain text

        if (unitId) {
            // if unit is int tree....
            const unit = await this.unitsService.getUnitById(unitId);
            user.unit = unit;
        }

        //todo: unit check!!!!

        return await this.userRepository.createUser(user);
    }

    /**
     * ziskani uzivatele na zaklade ID, pokud nenalezen vyhozena vyjimka
     * @param userId
     * @return User | NotFoundException
     */
    async getUserById(userId: number): Promise<User> {
        const found = await this.userRepository.findOne(userId);

        if (!found) {
            throw new NotFoundException(`User with ID "${userId}" not found!`);
        }

        return found;
    }

    /**
     * ziskani vsech uzivatelu
     * @param getUsersFilterDto
     * @return pole uzivatelu
     */
    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    /**
     * uprava uzivatelskych informaci
     * @param id
     * @param updateUserDto
     * @param user
     */
    async updateUser(id: number, updateUserDto: UpdateUserDto, user: User): Promise<User> {
        const {name, surname, unitId} = updateUserDto;
        if (!name && !surname && !unitId) throw new BadRequestException('Not specified any changes');
        const userForUpdate = await this.getUserById(id);


        if (name) userForUpdate.name = name;
        if (surname) userForUpdate.surname = surname;

        if (unitId && await this.unitsService.isManagerInTree(unitId, user)) {
            userForUpdate.unit = await this.unitsService.getUnitById(unitId);
        }

        await userForUpdate.save();
        return userForUpdate;
    }

    async deleteUser(id: number, user: User): Promise<void> {
        const userToDelete = await this.getUserById(id);
        const inScope = await this.inScope(userToDelete, user);

        if (userToDelete && inScope) {
            //todo: a zda nemá přidělený žádný majetek
            await this.userRepository.remove(userToDelete);
            return;
        }

        throw new ForbiddenException('You are not able to delete user from this unit');
    }

    /**
     * nastaveni prav uzivatele
     * @param userId
     * @param setUserRightsDto
     */
    async setUsersRights(userId: number, setUserRightsDto: SetUserRightsDto, user: User): Promise<void> {
        const editedUser = await this.getUserById(userId);
        const inScope = this.inScope(editedUser, user);
        const {addRights, removeRights} = setUserRightsDto || {};
        if (addRights )

        if (editedUser && inScope) {
            if (addRights && addRights.length > 0) {
                for (const rightsToAdd of addRights) {
                    const rights = await this.rightsService.getRightsById(rightsToAdd);
                    if (rights && !editedUser.rights.includes(rights)) {
                        editedUser.rights.push(rights);
                    }
                }
            }

            if (removeRights && removeRights.length > 0) {
                for (const rightsToRemove of removeRights) {
                    const rights = await this.rightsService.getRightsById(rightsToRemove);
                    if (rights && !!editedUser.rights.find(r => r.id === rights.id)) {
                        editedUser.rights = editedUser.rights.slice(0).filter(r => r.id !== rights.id);
                    }
                }
            }
            try {
                await editedUser.save();
                return;
            } catch (e) {
                throw new InternalServerErrorException('Setting rights failed');
            }
        }
        return;
    }


}
