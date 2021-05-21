import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AccountModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(AccountModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3000 },
  });

  app.listen(() => console.log('account-service is listening on port 3000'));
})()
