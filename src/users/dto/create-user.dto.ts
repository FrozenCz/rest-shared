/**
 * trida reprezentujici prichozi objekt na vytvoreni uzivatele
 */
import {IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      {message: 'password must contain lower and upper case letters, number and special symbol'})
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string;

  @IsOptional()
  @IsNumber()
  idAssetManager?: number;
}
