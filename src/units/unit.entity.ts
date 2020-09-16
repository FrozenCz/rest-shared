import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren, TreeParent,
    Unique
} from "typeorm";
import {User} from "../users/user.entity";



@Entity()
@Tree('adjacency-list')
@Unique(['name'])
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => Unit, unit => unit.children)
    parent: Unit

    @OneToMany(type => Unit, unit => unit.parent)
    children: Unit[]

    @ManyToMany(type => User, {cascade: true})
    @JoinTable({
        name: 'units_users',
        joinColumn: {name: 'unit_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
    })
    users: User[]

}
