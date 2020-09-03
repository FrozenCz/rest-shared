import {BaseEntity, Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Rights extends BaseEntity{

  @PrimaryGeneratedColumn()
  idRights: number;

  @Column({length: 200})
  description: string;

}
