import {Injectable} from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import * as bcrypt from 'bcryptjs';

/**
 * UsersService
 * sluzba starajici se o operace nad uzivateli
 * @author: Milan Knop@2020
 */
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {
  }

  /**
   * vraci pocet uzivatelu
   */
  async countUsers(): Promise<number> {
    return await this.userRepository.count();
  }

  /**
   * createUser
   * vytvori uzivatele
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> | null {
    const {username, password, name, surname, idAssetManager} = createUserDto;

    // if (this.userRepository.findOne({username})) return;

    const user = new User();
    user.username = username;
    user.password = this.createHash(password);
    user.name = name;
    user.surname = surname;
    user.idAssetManager = createUserDto.idAssetManager ? createUserDto.idAssetManager : null;
    await user.save();

    return user;
  }

  private createHash(pass: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  }

}
