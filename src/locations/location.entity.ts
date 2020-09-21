import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {Assets} from "../assets/assets.entity";


@Entity()
@Tree('closure-table')
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeChildren()
    children: Location[]

    @TreeParent()
    parent: Location

    @OneToMany(type => Assets, assets => assets.id)
    assets: Assets[]

}
