import {EntityRepository, TreeRepository} from "typeorm";
import {Location} from "../location.entity";



@EntityRepository(Location)
export class LocationsRepository extends TreeRepository<Location> {

}
