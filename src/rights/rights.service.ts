import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RightsRepository} from "./repositories/rights.repository";
import {Rights} from "./rights.entity";
import {CreateRightsDto} from "./dto/create-rights.dto";

@Injectable()
export class RightsService {
    constructor(
        @InjectRepository(RightsRepository)
        private rightsRepository: RightsRepository
    ) {
    }

    async getRights(): Promise<Rights[]> {
        return await this.rightsRepository.find();
    }

    async createRights(createRightsDto: CreateRightsDto): Promise<void> {
        return await this.rightsRepository.createRights(createRightsDto);
    }

    async countRights(): Promise<number> {
        return await this.rightsRepository.count();
    }
}
