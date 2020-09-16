import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

/**
 * entity reprezentujici kategorie ve kterych je zarazen majetek
 */
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    code: string

    @Column({nullable: true})
    parent: number
}
