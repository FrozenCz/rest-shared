import {CreateRightsDto, RightsCategoryEnum} from "../dto/create-rights.dto";

export const RightsList: CreateRightsDto[] = [
    { relatedTo: RightsCategoryEnum.users, tag: 'createUser', name:'tvorba uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: 'deleteUser', name:'smazání uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: 'updateUsersInformation', name:'aktualizace uživatelských informací', description: 'Aktualizace jména, příjmení a fotografie?' },
    // { relatedTo: RightsCategoryEnum.users, tag: 'updateUsersInformation', name:'aktualizace uživatelských informací', description: 'Aktualizace jména, příjmení a fotografie?' },
];

