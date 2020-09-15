import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {User} from "../users/user.entity";


@Entity()
@Unique(['name'])
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    parent: number;

    @ManyToMany(type => User, {cascade: true})
    @JoinTable({
        name: 'units_users',
        joinColumn: {name: 'unit_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
    })
    users: User[]

}
