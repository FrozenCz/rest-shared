import {EntityRepository, Repository} from 'typeorm';
import {Assets} from '../assets.entity';


@EntityRepository(Assets)
export class AssetsRepository extends Repository<Assets>{


}
