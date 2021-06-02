import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AccountModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(AccountModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8081 },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.listen(() => console.log('account-service is listening on port 8081'));
})();
