import {EntityRepository, Repository} from 'typeorm';
import {Rights} from "../rights.entity";


@EntityRepository(Rights)
export class RightsRepository extends Repository<Rights>{

}
