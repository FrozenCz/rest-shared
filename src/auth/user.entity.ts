import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  idUser: number;

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

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
