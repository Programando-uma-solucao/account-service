import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AccountService } from './account.service';
import { RecoverSecretQuestionDTO } from './dtos/RecoverSecretQuestion.dto';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { AnswerSecretQuestionDTO } from './dtos/AnswerSecretQuestion.dto';
import { ChangePasswordDTO } from './dtos/ChangePassword.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern('createUser')
  async create(@Payload() data: CreateUserDTO) {
    return this.accountService.create(data);
  }

  @MessagePattern('getAccountByEmail')
  async getAccountByEmail(@Payload() email: string) {
    return this.accountService.getAccountByEmail(email);
  }

  @MessagePattern('getAccountById')
  async getAccountById(@Payload() id: string) {
    return this.accountService.getAccountById(id);
  }

  @MessagePattern('recoverSecretQuestion')
  async recoverSecretQuestion(@Payload() data: RecoverSecretQuestionDTO) {
    return this.accountService.recoverSecretQuestion(data);
  }

  @MessagePattern('answerSecretQuestion')
  async answerSecretQuestion(@Payload() data: AnswerSecretQuestionDTO) {
    return this.accountService.answerSecretQuestion(data);
  }

  @MessagePattern('changePassword')
  async changePassword(@Payload() data: ChangePasswordDTO) {
    return this.accountService.changePassword(data);
  }
}
