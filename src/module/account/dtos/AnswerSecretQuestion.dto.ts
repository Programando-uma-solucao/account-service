import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AnswerSecretQuestionDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
