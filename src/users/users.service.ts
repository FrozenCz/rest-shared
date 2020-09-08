import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "../auth/dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./repositories/user.repository";
import {User} from "./user.entity";
import {GetUsersFilterDto} from "../auth/dto/get-users-filter.dto";
import {AuthCredentialsDto} from "../auth/dto/auth-credentials.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }

    /**
     * vraci pocet uzivatelu
     */
    async countUsers(): Promise<number> {
        console.log(await this.userRepository.count());
        return await this.userRepository.count();
    }

    async createUser(createUserDto: CreateUserDto): Promise<void>{
        return await this.userRepository.createUser(createUserDto);
    }


    async getUserById(userId: number): Promise<User> {
        const found = await this.userRepository.findOne(userId);

        if (!found) {
            throw new NotFoundException(`User with ID "${userId}" not found!`);
        }

        return found;
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        this.userRepository.find().then(users => {
            users.forEach(user => {
                console.log(user.rights);
            })
        })
        console.log();
        return this.userRepository.getUsers(getUsersFilterDto);
    }

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userRepository.validateUser(authCredentialsDto);
    }

}
