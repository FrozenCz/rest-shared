import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent,} from "typeorm";
import {Unit} from "../units/unit.entity";

/**
 * entity reprezentujici kategorie ve kterych je zarazen majetek
 */
@Entity()
@Tree('closure-table')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    code: string

    @TreeChildren({cascade: true})
    children: Unit[];

    @TreeParent()
    parent: Unit;

    //TODO: OneToMany()..... na majetek
}
