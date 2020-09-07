import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {jwtModuleOptions} from "../config/jwt.config";
import {JwtPayloadInterface} from "./jwt-payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../users/repositories/user.repository";
import {User} from "../users/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtModuleOptions.secret,
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }
}
