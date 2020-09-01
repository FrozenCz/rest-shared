import {Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import * as bcrypt from 'bcryptjs';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";

/**
 * UsersService
 * sluzba starajici se o operace nad uzivateli
 * @author: Milan Knop@2020
 */
@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {
    }

    /**
     * vraci pocet uzivatelu
     */
    async countUsers(): Promise<number> {
        return await this.userRepository.count();
    }

    /**
     * createUser
     * vytvori uzivatele
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> | null {
        const {username, password, name, surname, idAssetManager} = createUserDto;

        // if (this.userRepository.findOne({username})) return;

        const user = new User();
        user.username = username;
        user.password = this.createHash(password);
        user.name = name;
        user.surname = surname;
        user.idAssetManager = createUserDto.idAssetManager ? createUserDto.idAssetManager : null;
        await user.save();

        return user;
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

    private createHash(pass: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
    }
}
