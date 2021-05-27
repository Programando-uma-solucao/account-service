import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  createAccount(): string {
    return 'account created';
  }
}
