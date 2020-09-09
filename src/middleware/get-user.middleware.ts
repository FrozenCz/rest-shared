import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {jwtModuleOptions} from '../config/jwt.config';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: () => void): any {

        const authJwtToken = req.headers.authorization;
        console.log(authJwtToken);

        if (!authJwtToken) {
            next();
            return;
        }

        try {
            const user = jwt.verify(authJwtToken, jwtModuleOptions.secret);

            if (user) {
                req["user"] = user;
            }

        } catch (err) {
            console.log('Error authentication!', err);
        }
        next();


    }

}
