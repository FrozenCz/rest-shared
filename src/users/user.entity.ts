import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Rights} from "../rights/rights.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  username: string;

  @Column({length: 50})
  name: string;

  @Column({length: 50})
  surname: string;

  @Column({length: 100, select:false})
  password: string;

  @Column({select: false})
  salt: string;

  @ManyToMany(type => Rights, {cascade: true, eager: true})
  @JoinTable({
    name: 'users_rights',
    joinColumn: {name: 'user_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'rights_id', referencedColumnName: 'id'}
  })
  rights: Rights[];

  @Column('int', {nullable: true})
  idAssetManager: number;



  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
