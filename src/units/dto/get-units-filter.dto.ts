import {IsInt, IsNumber, IsOptional} from "class-validator";

export class GetUnitsFilterDto {

    @IsInt()
    @IsOptional()
    parent: number;
}
