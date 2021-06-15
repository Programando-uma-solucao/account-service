import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { User, UserSchema } from './module/account/schemas/User.schema';
import { AccountService } from './module/account/account.service';
import { AccountController } from './module/account/account.controller';
import { CipherServiceConfig } from './config/microservices.config';

import {
  SecretQuestion,
  SecretQuestionSchema,
} from './module/account/schemas/SecretQuestion.schema';

import {
  SecretQuestionToken,
  SecretQuestionTokenSchema,
} from './module/account/schemas/SecretQuestionToken.schema';

import { SecretQuestionService } from './module/account/secretQuestion.service';
import { SecretQuestionTokenService } from './module/account/secretQuestionToken.service';

@Module({
  imports: [
    ClientsModule.register([CipherServiceConfig]),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DATABASE,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SecretQuestion.name, schema: SecretQuestionSchema },
      { name: SecretQuestionToken.name, schema: SecretQuestionTokenSchema },
    ]),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    SecretQuestionService,
    SecretQuestionTokenService,
  ],
})
export class AccountModule {}
