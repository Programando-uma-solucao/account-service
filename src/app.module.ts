import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './module/account/schemas/User.schema';
import { AccountService } from './module/account/account.service';
import { AccountController } from './module/account/account.controller';
import { CipherServiceConfig } from './config/microservices.config';
@Module({
  imports: [
    ClientsModule.register([CipherServiceConfig]),
    MongooseModule.forRoot('mongodb://localhost/account-service'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
