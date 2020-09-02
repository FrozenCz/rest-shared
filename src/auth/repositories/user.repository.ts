import {EntityRepository, Repository} from 'typeorm';
import {User} from '../user.entity';
import {GetUsersFilterDto} from "../dto/get-users-filter.dto";
import {AuthCredentialsDto} from "../dto/auth-credentials.dto";
import {CreateUserDto} from "../dto/create-user.dto";
import * as bcrypt from 'bcryptjs';



@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const { idAssetManager } = getUsersFilterDto;
        const query = this.createQueryBuilder('user');

        const users = await query.getMany();

        return users;
    }

    /**
     * createUser
     * vytvori uzivatele
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<void>{
        const {username, password, name, surname, idAssetManager} = createUserDto;

        // if (this.userRepository.findOne({username})) return;

        const user = new User();
        user.username = username;
        user.password = this.createHash(password);
        user.name = name;
        user.surname = surname;
        user.idAssetManager = createUserDto.idAssetManager ? createUserDto.idAssetManager : null;
        await user.save();
    }

    private createHash(pass: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
    }


}

