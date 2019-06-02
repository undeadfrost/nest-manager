import {IsNotEmpty, IsString} from 'class-validator';

export class AuthBaseDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class AuthLoginDto extends AuthBaseDto {}
