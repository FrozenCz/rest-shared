import {CreateRightsDto, RightsCategoryEnum} from "../dto/create-rights.dto";

export const RightsList: CreateRightsDto[] = [
    { relatedTo: RightsCategoryEnum.users, tag: 'createUser', name:'tvorba uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: 'deleteUser', name:'tvorba uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: 'updateUser', name:'tvorba uživatele' },
];
