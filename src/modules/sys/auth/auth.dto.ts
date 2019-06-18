import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiModelProperty({ description: '用户名' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class AuthRegisterDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
