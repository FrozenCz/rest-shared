import {Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * entity reprezentujici kategorie ve kterych je zarazen majetek
 */
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number


}
