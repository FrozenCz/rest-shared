import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/user.entity';
import {Rights} from './rights.entity';

@Entity('UsersRights')
export class UsersRights extends BaseEntity {

  @PrimaryGeneratedColumn()
  public UsersRightsId!: number;

  @Column()
  public status!: UsersRightsStatus;

  @ManyToOne(type => User, user => user.idUser)
  public user!: User;

  @ManyToOne(type => Rights, rights => rights.idRights)
  public rights!: Rights;

}


export enum UsersRightsStatus {
  forbidden, allowed
}
