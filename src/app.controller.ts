import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from './auth/auth.service';
import {CreateUserDto} from './auth/dto/create-user.dto';
import {RightsService} from "./rights/rights.service";
import {UsersService} from "./users/users.service";

@Controller()
export class AppController {

    constructor(private readonly appService: AppService, private usersService: UsersService, private rightsService: RightsService) {
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

        this.rightsService.countRights().then(
            (rightsCount) => {
                if (!rightsCount) {
                    // this.rightsService.createRights({name: 'Tvorba uživatele'});
                }
            }
        )

    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
