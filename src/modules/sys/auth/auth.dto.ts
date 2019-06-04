import {IsNotEmpty, IsString, MinLength} from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
