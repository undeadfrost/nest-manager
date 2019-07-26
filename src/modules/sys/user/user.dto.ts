import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsMobilePhone,
  IsBoolean,
  IsArray,
  ValidateIf,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// tslint:disable-next-line:max-line-length
// MobilePhoneLocale = "ar-AE" | "ar-DZ" | "ar-EG" | "ar-JO" | "ar-SA" | "ar-SY" | "be-BY" | "bg-BG" | "cs-CZ" | "de-DE" | "da-DK" | "el-GR" | "en-AU" | "en-GB" | "en-HK" | "en-IN" | "en-KE" | "en-NG" | "en-NZ" | "en-UG" | "en-RW" | "en-SG" | "en-TZ" | "en-PK" | "en-US" | "en-CA" | "en-ZA" | "en-ZM" | "es-ES" | "fa-IR" | "fi-FI" | "fo-FO" | "fr-FR" | "he-IL" | "hu-HU" | "id-ID" | "it-IT" | "ja-JP" | "kk-KZ" | "kl-GL" | "ko-KR" | "lt-LT" | "ms-MY" | "nb-NO" | "nn-NO" | "pl-PL" | "pt-PT" | "ro-RO" | "ru-RU" | "sk-SK" | "sr-RS" | "th-TH" | "tr-TR" | "uk-UA" | "vi-VN" | "zh-CN" | "zh-HK" | "zh-TW" | "any";

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsMobilePhone('zh-CN')
  mobile: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiModelProperty({ required: false, type: [Number] })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsArray()
  roleIds: number[];
}

export class UpdateUserDto {
  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsMobilePhone('zh-CN')
  mobile: string;

  @ApiModelProperty({ required: false })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiModelProperty({ required: false, type: [Number] })
  @ValidateIf((object, value) => value !== '')
  @IsOptional()
  @IsArray()
  roleIds: number[];
}

export class GetUserDto {
  @ApiModelProperty({ required: false })
  pageNum: number;

  @ApiModelProperty({ required: false })
  pageSize: number;
}

export class ChangePasswordDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  confirmPassword: string;
}
