import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern('create')
  createAccount(): string {
    return this.accountService.createAccount();
  }
}
