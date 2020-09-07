import {SetMetadata} from "@nestjs/common";

export const Rights = (...rights: string[]) => SetMetadata('rights', rights);
