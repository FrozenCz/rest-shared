import {BaseEntity, Column, Entity, IsNull, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Rights')
export class Rights extends BaseEntity{

  @PrimaryGeneratedColumn()
  idRights: number;

  @Column()
  description: string;

}
