import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { CheckoutUseCases } from '@core/application/factories/checkout-usecases.factory';
import { CustomerUseCases } from '@core/application/factories/customer-usecases.factory';
import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CheckoutController } from './controllers/checkout.controller';
import { CustomerController } from './controllers/customer.controller';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { CustomerService } from './services/customer.service';

@Module({
  controllers: [CustomerController, CartController, CheckoutController],
  providers: [
    CustomerService,
    CustomerUseCases,
    CartService,
    CartUseCases,
    CheckoutService,
    CheckoutUseCases,
  ],
})
export class HttpModule {}
