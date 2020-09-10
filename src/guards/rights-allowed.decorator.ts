import {SetMetadata} from "@nestjs/common";

export const RightsAllowed = (...rights: string[]) => SetMetadata('RightsAllowed', rights);
