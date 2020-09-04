import {IsEnum, IsOptional, IsString} from "class-validator";

export enum RightsCategoryEnum {
    users = 'users', rights = 'rights',
}

export class CreateRightsDto {
    @IsString()
    name: string;

    @IsString()
    tag: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(RightsCategoryEnum)
    relatedTo: RightsCategoryEnum
}


