import {EntityRepository, Repository} from 'typeorm';
import {User} from '../user.entity';
import {GetUsersFilterDto} from "../../auth/dto/get-users-filter.dto";
import {CreateUserDto} from "../../auth/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {AuthCredentialsDto} from "../../auth/dto/auth-credentials.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    /**
     * createUser
     * vytvori uzivatele
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const {username, password, name, surname, idAssetManager} = createUserDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPasword(password, user.salt);
        user.name = name;
        user.surname = surname;
        user.idAssetManager = createUserDto.idAssetManager ? createUserDto.idAssetManager : null;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.createQueryBuilder('user')
            .addSelect(['user.salt', 'user.password'])
            .where('user.username = :username', {username})
            .getOne();

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const {idAssetManager} = getUsersFilterDto;
        const query = this.createQueryBuilder('user');
        const users = await query.getMany();
        return users;
    }


    private async hashPasword(pass: string, salt: string): Promise<string> {
        return bcrypt.hash(pass, salt);
    }


}

