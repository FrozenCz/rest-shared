import {BaseEntity, Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../auth/user.entity";

@Entity()
export class Rights extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 200})
  description: string;

  @ManyToMany(type=> User, {cascade: true})
  @JoinTable({
    name: 'users_rights',
    joinColumn: {name: 'rights_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
  })
  users: User[]

}
