import { IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverSecretQuestionDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
