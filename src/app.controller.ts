import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {UsersService} from './users/users.service';
import {CreateUserDto} from './users/dto/create-user.dto';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService, private usersService: UsersService) {
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
              console.log(res);
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
