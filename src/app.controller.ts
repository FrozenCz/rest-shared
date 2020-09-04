import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from './auth/auth.service';
import {CreateUserDto} from './auth/dto/create-user.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, private usersService: AuthService) {
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
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
