import { ValidateIf, IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  remark: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsArray()
  menuIds: number[];
}
