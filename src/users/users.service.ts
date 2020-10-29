import {forwardRef, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {User} from "./user.entity";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UnitsService} from '../units/units.service';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @Inject(forwardRef(() => UnitsService))
        private unitsService: UnitsService
    ) {
    }

    /**
     * vraci pocet uzivatelu
     */
    async countUsers(): Promise<number> {
        console.log(await this.userRepository.count());
        return await this.userRepository.count();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User>{
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


    async getUserById(userId: number): Promise<User> {
        const found = await this.userRepository.findOne(userId);

        if (!found) {
            throw new NotFoundException(`User with ID "${userId}" not found!`);
        }

        return found;
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    async updateUser(id:number, updateUserDto: UpdateUserDto, user: User): Promise<void> {
        const {name, surname} = updateUserDto;
        const userForUpdate = await this.getUserById(id);

        userForUpdate.name = name;
        userForUpdate.username = surname;
        await userForUpdate.save();

        return;
    }

    private async assetHierarchyCheck(whoWants: User, whichOne: User): Promise<boolean> {
        // pokud se jedná o stejného uživatele, nebo pokud je uživatel pod stejným assetManagerem
        // if (whoWants.idAssetManager === whichOne.idAssetManager) return true;

        //nebo pokud je hierarchicky ve stromě
        //TODO: dodělat tuto fci až budou hotové kategorie, bude potřeba ještě udělat rekurzivní funkci pro zjistění stromu
        return ;
    }

}
