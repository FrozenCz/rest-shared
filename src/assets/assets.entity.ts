import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/user.entity';


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

    @OneToOne(type => User)
    @JoinColumn()
    user: User

    //TODO: uctovaci doklady
}
