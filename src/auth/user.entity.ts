import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcryptjs';
// import {UsersRights} from "../rights/usersRights.entity";
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

  @Column('int', {nullable: true})
  idAssetManager: number;

  @ManyToMany(type => Rights, {cascade: true} )
  rights: Rights[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
