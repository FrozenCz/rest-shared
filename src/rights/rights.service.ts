import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RightsRepository} from "./repositories/rights.repository";
import {Rights} from "./rights.entity";

@Injectable()
export class RightsService {
    constructor(
        @InjectRepository(RightsRepository)
        private rightsRepository: RightsRepository
    ) {
    }

    async getRights(): Promise<Rights[]> {
        return this.rightsRepository.find();
    }

}
