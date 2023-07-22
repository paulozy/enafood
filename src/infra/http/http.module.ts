import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { CheckoutUseCases } from '@core/application/factories/checkout-usecases.factory';
import { CustomerUseCases } from '@core/application/factories/customer-usecases.factory';
import { OrderUseCases } from '@core/application/factories/order-usecases.factory';
import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CheckoutController } from './controllers/checkout.controller';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';

@Module({
  controllers: [
    CustomerController,
    CartController,
    CheckoutController,
    OrderController,
  ],
  providers: [
    CustomerService,
    CustomerUseCases,
    CartService,
    CartUseCases,
    CheckoutService,
    CheckoutUseCases,
    OrderService,
    OrderUseCases,
  ],
})
export class HttpModule {}
