import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from '../users/repositories/user.repository';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt-payload.interface";

/**
 * AuthService
 * sluzba starajici se o operace nad uzivateli
 * @author: Milan Knop@2020
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}



    async singIn(authCredentialsDto: AuthCredentialsDto): Promise< { accessToken: string } > {
        const user = await this.userRepository.validateUser(authCredentialsDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        let rightsAsString = '';
        user.rights.forEach((rights) => {
            rightsAsString+=rights.tag+' ';
        })


        const payload: JwtPayloadInterface = { username: user.username, rights: rightsAsString.trim() };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };

    }



}
