import {IsIn, IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class CreateLocationDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    parent: number

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    masterUnit: number

}
