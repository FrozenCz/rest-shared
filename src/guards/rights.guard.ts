import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

/**
 * guard kontrolujici zda uzivatel ma prava k akci
 * @class RightsGuard
 * @author Milan Knop
 * @return boolean
 */
@Injectable()
export class RightsGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const rights = this.reflector.get<string[]>('rights', context.getHandler());
        if (!rights) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.rights) return false;

        return user.rights.some((permission) => permission.tag === rights[0]);
    }

}
