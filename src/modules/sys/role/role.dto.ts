import { ValidateIf, IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  remark: string;

  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsArray()
  menuIds: number[];
}
