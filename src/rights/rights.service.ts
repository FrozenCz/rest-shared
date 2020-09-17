import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RightsRepository} from "./repositories/rights.repository";
import {Rights} from "./rights.entity";
import {CreateRightsDto} from "./dto/create-rights.dto";
import {RightsList} from "./config/rights.list";
import {UserRepository} from "../users/repositories/user.repository";

@Injectable()
export class RightsService {
    constructor(
        @InjectRepository(RightsRepository)
        private rightsRepository: RightsRepository,
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository
    ) {
    }

    async getRights(): Promise<Rights[]> {
        return await this.rightsRepository.find();
    }

    async createRights(createRightsDto: CreateRightsDto): Promise<Rights> {
        return await this.rightsRepository.createRights(createRightsDto);
    }

    async countRights(): Promise<number> {
        return await this.rightsRepository.count();
    }

    async fillRights(): Promise<void> {
        const allRights = RightsList;
        const admin = await this.usersRepository.findOne({id: 1});
        if(!admin.rights) admin.rights = [];

        allRights.forEach(right => {
            this.createRights(right).then(
                (rights) => {
                    admin.rights.push(rights);
                }
            ).then(() => {
                if (admin.rights.length === allRights.length) {
                    admin.save();
                }
            })
        });


    }

}
