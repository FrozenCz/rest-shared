import {BaseEntity, Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../auth/user.entity";
import {RightsCategoryEnum} from "./dto/create-rights.dto";

@Entity()
export class Rights extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column( {unique: true})
  tag: string;

  @Column({length: 100})
  name: string;

  @Column({length: 200})
  description?: string;

  @Column( )
  relatedTo: RightsCategoryEnum

  @ManyToMany(type=> User, {cascade: true})
  @JoinTable({
    name: 'users_rights',
    joinColumn: {name: 'rights_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
  })
  users: User[]

}
