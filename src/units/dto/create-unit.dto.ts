import {IsInt, IsOptional, IsString} from "class-validator";


export class CreateUnitDto {

    @IsString()
    name: string;

    @IsInt()
    @IsOptional()
    parent: number;

}
