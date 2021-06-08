import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSecretQuestionTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
