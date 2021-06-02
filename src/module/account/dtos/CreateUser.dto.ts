import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum({ LAWYER: 'LAWYER', COMMOM: 'COMMOM' })
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  secretQuestion: string;

  @IsString()
  @IsNotEmpty()
  secretAnswer: string;

  @IsString()
  @IsOptional()
  oab?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: Array<string>;
}
