import { IsNotEmpty, IsString, ValidateIf, IsOptional, IsIn, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  router?: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsIn([0, 1, 2])
  type: number;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  permission?: string;

  @ApiModelProperty({ required: false })
  icon?: string;

  @ApiModelProperty({ required: false })
  description?: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsInt()
  orderNum?: number;

  parentName?: string;
}

export class UpdateMenuDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  router?: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  permission?: string;

  @ApiModelProperty({ required: false })
  icon?: string;

  @ApiModelProperty({ required: false })
  description?: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsInt()
  orderNum?: number;

  parentName?: string;
}
