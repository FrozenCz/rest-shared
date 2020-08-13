/**
 * trida reprezentujici prichozi objekt na vytvoreni uzivatele
 */
export class CreateUserDto {

  username: string;
  password: string;
  name: string;
  surname: string;
  idAssetManager?: number;

}
