import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class CreateLocationDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    unit: number

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    parent: number

    //todo: zamyslet se nad tim zda locations sharovat mezi uzivateli ci nikoli?

}
