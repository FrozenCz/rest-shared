import {IsEnum, IsOptional, IsString} from "class-validator";
import {RightsCategory, RightsTag} from "../config/rights.list";



export class CreateRightsDto {
    @IsString()
    name: string;

    @IsString()
    tag: RightsTag;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(RightsCategory)
    relatedTo: RightsCategory
}


