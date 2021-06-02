import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './module/account/schemas/User.schema';
import { AccountService } from './module/account/account.service';
import { AccountController } from './module/account/account.controller';
import { CipherServiceConfig } from './config/microservices.config';
import {
  SecretQuestion,
  SecretQuestionSchema,
} from './module/account/schemas/SecretQuestion.schema';
import { SecretQuestionService } from './module/account/secretQuestion.service';

@Module({
  imports: [
    ClientsModule.register([CipherServiceConfig]),
    MongooseModule.forRoot('mongodb://localhost/account-service'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SecretQuestion.name, schema: SecretQuestionSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, SecretQuestionService],
})
export class AccountModule {}
