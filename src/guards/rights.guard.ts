import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";


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
        console.log(user);

        if (!user || !user.rights) return false;


        return rights.some(r => user.rights.includes(r));
    }

}
