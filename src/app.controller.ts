import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from './auth/auth.service';
import {CreateUserDto} from './auth/dto/create-user.dto';
import {RightsService} from "./rights/rights.service";
import {Rights} from "./rights/rights.entity";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, private usersService: AuthService, private rightsService: RightsService) {
    /**
     * first initiation of superadmin
     */
    this.usersService.countUsers().then(
      (usersCount) => {
        if (!usersCount) {
          const superAdmin: CreateUserDto = {
            username: 'Administrator',
            password: 'BpKnop',
            name: 'admin',
            surname: 'hlavni',
          };
          this.usersService.createUser(superAdmin).then(
            (res) => {
              console.log('Vytvořen admim');
            }
          );
        }
      }
    );

    this.rightsService.countRights().then(
        (rightsCount) => {
          if(!rightsCount){
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
