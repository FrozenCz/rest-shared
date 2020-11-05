import {IsOptional} from "class-validator";


export class SetUserRightsDto {
    @IsOptional()
    addRights?: number[];

    @IsOptional()
    removeRights?: number[];
}
