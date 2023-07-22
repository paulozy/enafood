import { HasherGateway } from '@domain/gateways/hasher.gateway';
import { PaymentGateway } from '@domain/gateways/payment.gateway';
import { Global, Module } from '@nestjs/common';
import { BcryptHasherGateway } from './bcrypt/bcrypt.service';
import { FakePaymentGateway } from './payment/payment.service';

@Global()
@Module({
  providers: [
    BcryptHasherGateway,
    {
      provide: HasherGateway,
      useClass: BcryptHasherGateway,
    },
    FakePaymentGateway,
    {
      provide: PaymentGateway,
      useClass: FakePaymentGateway,
    },
  ],
  exports: [
    BcryptHasherGateway,
    HasherGateway,
    FakePaymentGateway,
    PaymentGateway,
  ],
})
export class GatewayModule {}
