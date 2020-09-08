import {IsOptional} from "class-validator";

export class GetUsersFilterDto {


    @IsOptional()
    idAssetManager: number

}
