import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class CreateCategoryDto {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    code?: string

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    parent?: number
}
