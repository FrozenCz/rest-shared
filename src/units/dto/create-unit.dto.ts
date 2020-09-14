import {IsInt, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {User} from "../../users/user.entity";


export class CreateUnitDto {

    @IsString()
    name: string;

    @IsInt()
    @Transform(value => Number(value))
    @IsOptional()
    parent: number;

}
