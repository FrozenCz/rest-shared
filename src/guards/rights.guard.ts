import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";


@Injectable()
export class RightsGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const rights = this.reflector.get<string[]>('rights', context.getHandler());
        if (!rights) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user || !user.rights) return false;

        return rights.some(r => user.rights.includes(r));
    }
}
