import {JwtModuleOptions} from "@nestjs/jwt";

export const jwtModuleOptions: JwtModuleOptions = {
    secret: 'MilanKnop@BP-evMajetku2020@uhk.cz',
    signOptions: {
        expiresIn: 3600,
    }
}
