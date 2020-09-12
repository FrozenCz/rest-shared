import {IsInt, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";


export class CreateUnitDto {

    @IsString()
    name: string;

    @IsInt()
    @Transform(value => Number(value))
    @IsOptional()
    parent: number;

}
