import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  create(): string {
    return 'account created';
  }
}
