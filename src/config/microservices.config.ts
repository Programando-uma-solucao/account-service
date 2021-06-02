import { ClientProviderOptions, Transport } from '@nestjs/microservices';

const CipherServiceConfig: ClientProviderOptions = {
  name: 'CIPHER_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8082,
  },
};

export { CipherServiceConfig };
