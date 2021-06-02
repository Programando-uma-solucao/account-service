import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AccountService } from './account.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { User } from './schemas/User.schema';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern('createUser')
  async create(@Payload() data: CreateUserDTO): Promise<User> {
    return this.accountService.create(data);
  }
}
