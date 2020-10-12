import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {CreateUserDto} from './users/dto/create-user.dto';
import {RightsService} from "./rights/rights.service";
import {UsersService} from "./users/users.service";
import {Rights} from "./rights/rights.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RightsRepository} from "./rights/repositories/rights.repository";

@Controller()
export class AppController {

    constructor(
        @InjectRepository(RightsRepository)
        private rightsRepository: RightsRepository,
        private readonly appService: AppService, private usersService: UsersService, private rightsService: RightsService) {
        /**
         * first initiation of superadmin
         */
        this.usersService.countUsers().then(
            (usersCount) => {
                if (!usersCount) {
                    const superAdmin: CreateUserDto = {
                        username: 'Administrator',
                        password: 'BpKnop123!',
                        name: 'admin',
                        surname: 'hlavni',
                    };
                    this.usersService.createUser(superAdmin).then(
                        (res) => {
                            this.rightsService.fillRights().then(
                                () => {
                                    const testUser: CreateUserDto = {
                                        username: 'testtest',
                                        password: 'Test123!!',
                                        name: 'test',
                                        surname: 'profil',
                                    };
                                    this.usersService.createUser(testUser).then(()=>{
                                        console.log('done!');
                                    })
                                }
                            )
                        }
                    );
                }
            }
        );


    }
}
