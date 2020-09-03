import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {User} from './user.entity';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {JwtService} from "@nestjs/jwt";

/**
 * AuthService
 * sluzba starajici se o operace nad uzivateli
 * @author: Milan Knop@2020
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    /**
     * vraci pocet uzivatelu
     */
    async countUsers(): Promise<number> {
        return await this.userRepository.count();
    }

    async createUser(createUserDto: CreateUserDto): Promise<void>{
        return this.userRepository.createUser(createUserDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const username = await this.userRepository.validateUser(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return 'JWT';

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


}
