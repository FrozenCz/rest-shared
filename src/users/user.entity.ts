import {BaseEntity, Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Rights} from '../rights/repositories/rights.repository';

@Entity('Users')
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({length: 50})
  username: string;

  @Column({length: 50})
  name: string;

  @Column({length: 50})
  surname: string;

  @Column({length: 100})
  password: string;

  @Column('int', {nullable: true})
  idAssetManager: number;

}
