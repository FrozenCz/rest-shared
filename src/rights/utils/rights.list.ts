import {CreateRightsDto} from "../dto/create-rights.dto";

export enum RightsCategory {
    users = 'users', rights = 'rights', units = 'units'
}

export enum RightsTag {
    getUser = 'getUser',
    createUser = 'createUser',
    deleteUser = 'deleteUser',
    updateUsersInformation = 'updateUsersInformation',

    createRights = 'createRights',

    createUnits = 'createUnits',
    deleteUnits = 'deleteUnits',
    addManagerToUnits = 'addManagerToUnits',
    removeManagerFromUnits = 'removeManagerFromUnits',


}

export const RightsList: CreateRightsDto[] = [
    { relatedTo: RightsCategory.users, tag: RightsTag.getUser, name:'zobrazení uživatele' },
    { relatedTo: RightsCategory.users, tag: RightsTag.createUser, name:'tvorba uživatele' },
    { relatedTo: RightsCategory.users, tag: RightsTag.deleteUser, name:'smazání uživatele' },
    { relatedTo: RightsCategory.users, tag: RightsTag.updateUsersInformation, name:'aktualizace uživatelských informací', description: 'Aktualizace jména, příjmení a fotografie?' },

    { relatedTo: RightsCategory.rights, tag: RightsTag.createRights, name:'tvorba práv' },

    { relatedTo: RightsCategory.units, tag: RightsTag.createUnits, name:'tvorba jednotek' },
    { relatedTo: RightsCategory.units, tag: RightsTag.deleteUnits, name:'mazání jednotek' },
    { relatedTo: RightsCategory.units, tag: RightsTag.addManagerToUnits, name:'přidávání manažerů jednotkám' },
    { relatedTo: RightsCategory.units, tag: RightsTag.removeManagerFromUnits, name:'odebírání manažerů z jednotek' },
    // { relatedTo: RightsCategoryEnum.users, tag: 'updateUsersInformation', name:'aktualizace uživatelských informací', description: 'Aktualizace jména, příjmení a fotografie?' },
];

