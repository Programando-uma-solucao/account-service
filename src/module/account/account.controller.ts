import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AccountService } from './account.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern('createUser')
  async create(@Payload() data: CreateUserDTO) {
    return this.accountService.create(data);
  }

  @MessagePattern('getAccount')
  async getAccount(@Payload() data: any) {
    return this.accountService.getAccount(data);
  }
}
