import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../../../src/module/account/account.service';
import { AccountController } from '../../../src/module/account/account.controller';

describe('AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const account: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = account.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(accountController.createAccount()).toBe('account created');
  });
});
