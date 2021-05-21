import { Module } from '@nestjs/common';
import { AccountController } from './module/account/account.controller';
import { AccountService } from './module/account/account.service';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/account-service')],
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
