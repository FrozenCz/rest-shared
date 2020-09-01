import {EntityRepository, Repository} from 'typeorm';
import {User} from '../user.entity';
import {GetUsersFilterDto} from "../dto/get-users-filter.dto";
import {NotFoundException} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const { idAssetManager } = getUsersFilterDto;
        const query = this.createQueryBuilder('user');

        const users = await query.getMany();

        return users;
    }



}

