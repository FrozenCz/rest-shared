/**
 * trida reprezentujici prichozi objekt na vytvoreni uzivatele
 */
import {IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {AuthCredentialsDto} from "../../auth/dto/auth-credentials.dto";
import {Unit} from '../../units/unit.entity';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto extends AuthCredentialsDto{

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
  unitId?: number;
}
