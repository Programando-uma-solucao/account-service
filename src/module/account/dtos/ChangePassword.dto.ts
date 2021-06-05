import { IsNotEmpty, IsEmail } from 'class-validator';

export class ChangePasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
