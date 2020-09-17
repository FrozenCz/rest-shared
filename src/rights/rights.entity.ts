import {BaseEntity, Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {RightsCategory, RightsTag} from "./config/rights.list";


@Entity()
export class Rights extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column( {unique: true})
  tag: RightsTag;

  @Column({length: 100})
  name: string;

  @Column({length: 200, nullable: true})
  description: string;

  @Column( )
  relatedTo: RightsCategory

  // @ManyToMany(type=> User, {cascade: true})
  // @JoinTable({
  //   name: 'users_rights',
  //   joinColumn: {name: 'rights_id', referencedColumnName: 'id'},
  //   inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
  // })
  // users: User[]

}
