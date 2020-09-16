import {IsBoolean, IsInt, IsOptional} from "class-validator";

export class GetUnitsFilterDto {

    @IsOptional()
    @IsInt()
    parent: number;

}
