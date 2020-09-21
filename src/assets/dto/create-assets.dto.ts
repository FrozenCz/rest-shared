import {User} from '../../users/user.entity';
import {IsDate, IsInt, IsOptional, IsString, Min} from 'class-validator';
import {Transform} from 'class-transformer';
import {JoinColumn, OneToOne} from 'typeorm';


export class CreateAssetsDto {

    @IsString()
    name: string
    
    @Transform(value => Number(value))
    @Min(1)
    @IsInt()
    pieces: number

    @IsOptional()
    @IsString()
    serialNumber: string

    @IsOptional()
    @IsString()
    evidencyNumber: string

    @IsOptional()
    @IsString()
    inventaryNumber: string

    @IsDate()
    acquisitionDate: Date

    @OneToOne(type => User)
    @JoinColumn()
    user: User

}
