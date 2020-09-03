import {IsOptional} from "class-validator";

export class UserWithoutPassDto {
    idUser: string;
    nickname: string;
    name: string;
    surname: string;

    @IsOptional()
    idAssetManager: number;
}
