import {
    BaseEntity,
    Column,
    Entity, JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {Assets} from "../assets/assets.entity";
import {Unit} from '../units/unit.entity';


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

    @ManyToOne(type => Unit, unit => unit.id, {eager: true})
    masterUnit: Unit //unit without parent

}
