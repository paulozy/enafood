import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { CheckoutUseCases } from '@core/application/factories/checkout-usecases.factory';
import { CustomerUseCases } from '@core/application/factories/customer-usecases.factory';
import { OrderUseCases } from '@core/application/factories/order-usecases.factory';
import { ProductUseCases } from '@core/application/factories/product-usecases.factory';
import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CheckoutController } from './controllers/checkout.controller';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

@Module({
  controllers: [
    CustomerController,
    CartController,
    CheckoutController,
    OrderController,
    ProductController,
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
    ProductService,
    ProductUseCases,
  ],
})
export class HttpModule {}
