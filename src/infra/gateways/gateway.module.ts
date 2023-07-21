import { HasherGateway } from '@domain/gateways/hasher.gateway';
import { Global, Module } from '@nestjs/common';
import { BcryptHasherGateway } from './bcrypt/bcrypt.service';

@Global()
@Module({
  providers: [
    BcryptHasherGateway,
    {
      provide: HasherGateway,
      useClass: BcryptHasherGateway,
    },
  ],
  exports: [BcryptHasherGateway, HasherGateway],
})
export class GatewayModule {}
