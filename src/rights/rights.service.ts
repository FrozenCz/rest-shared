import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RightsRepository} from "./repositories/rights.repository";
import {Rights} from "./rights.entity";
import {CreateRightsDto} from "./dto/create-rights.dto";
import {RightsList} from "./utils/rights.list";
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class RightsService {
    constructor(
        @InjectRepository(RightsRepository)
        private rightsRepository: RightsRepository,
        private usersService: UsersService
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
        const admin = await this.usersService.getUserById(1);
        allRights.forEach(right => {
            this.createRights(right).then(
                (rights) => {
                    rights.users.push(admin);
                }
            )

        });
    }
}
