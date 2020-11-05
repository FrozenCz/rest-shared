import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {CreateUserDto} from './users/dto/create-user.dto';
import {RightsService} from "./rights/rights.service";
import {UsersService} from "./users/users.service";
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
                                    let i = 1;
                                    const createUsers = setInterval(() => {
                                        const testUser: CreateUserDto = {
                                            username: 'testtest_'+i,
                                            password: 'Test123!!',
                                            name: 'test_'+i,
                                            surname: 'profil_'+i,
                                        };
                                        i++;
                                        this.usersService.createUser(testUser).catch(err => {
                                            console.log(err);
                                        })
                                        if (i === 3000) clearInterval(createUsers);
                                    }, 300);

                                }
                            )
                        }
                    );
                }
            }
        );


    }
}
