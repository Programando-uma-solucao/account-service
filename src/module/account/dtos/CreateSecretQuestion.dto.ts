import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSecretQuestionDTO {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  questionHash: string;

  @IsString()
  @IsNotEmpty()
  answerHash: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
