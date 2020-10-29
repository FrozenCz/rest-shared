import {EntityRepository, Repository} from 'typeorm';
import {User} from '../user.entity';
import {GetUsersFilterDto} from "../dto/get-users-filter.dto";
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
    async createUser(validUser: User): Promise<User> {

        const user = validUser;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPasword(validUser.password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.salt;
        delete user.password;

        return user;
    }

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;
        const user = await this.createQueryBuilder('user')
            .addSelect(['user.salt', 'user.password'])
            .leftJoinAndSelect('user.rights', 'rights')
            .leftJoinAndSelect('user.unit', 'units')
            .where('user.username = :username', {username})
            .getOne();

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const {unitId} = getUsersFilterDto || {};
        const query = this.createQueryBuilder('user')
            .addSelect(['user.unit'])
            .leftJoinAndSelect('user.unit', 'units')
        // if (unitId) query.where('user.unit = :unit', {unitId}) // TODO: UDELAT OMEZENI NA JEDNOTKU
        const users = await query.getMany();
        return users;
    }


    private async hashPasword(pass: string, salt: string): Promise<string> {
        return bcrypt.hash(pass, salt);
    }


}

