import {EntityRepository, Repository} from 'typeorm';
import {Rights} from "../rights.entity";
import {CreateRightsDto} from "../dto/create-rights.dto";
import {InternalServerErrorException} from "@nestjs/common";

/**
 * representing comunication with database
 */
@EntityRepository(Rights)
export class RightsRepository extends Repository<Rights> {

    /**
     * creating rights
     * @param createRightsDto
     */
    async createRights(createRightsDto: CreateRightsDto): Promise<void> {
        const {description, relatedTo, name} = createRightsDto;
        const rights = new Rights();

        rights.name = name;
        rights.description = description;
        rights.relatedTo = relatedTo;

        try {
            await rights.save();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

}
