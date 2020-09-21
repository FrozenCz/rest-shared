import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/user.entity';
import {Category} from "../categories/category.entity";


@Entity()
export class Assets extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    name: string

    @Column()
    pieces: number

    @Column()
    serialNumber: string

    @Column()
    evidencyNumber: string

    @Column()
    inventaryNumber: string

    @Column()
    acquisitionDate: Date

    @Column({type: "decimal", precision: 5, scale: 2})
    price: number

    @OneToOne(type => User, user => user.id)
    @JoinColumn()
    user: User

    @ManyToOne(type => Category, category => category.id)
    category: Category

    //TODO: @ManyToOne(type => Locations )

    //TODO: uctovaci doklady
}
