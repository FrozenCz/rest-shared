import {SetMetadata} from "@nestjs/common";
import {RightsTag} from "../rights/utils/rights.list";

export const RightsAllowed = (rights: RightsTag) => SetMetadata('RightsAllowed', rights);
